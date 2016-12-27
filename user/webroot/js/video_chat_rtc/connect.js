var connect = (function(){
	"use strict";

	var obj = {};
	var element = null;

	/* use the constant signal host and port */
	obj.signalHost = constant.signalHost;
	obj.signalPort = constant.signalPort;

	/* for active socket connection */
	obj.socket = null;
	/* for active peer connection */
	obj.peer = null;

	/* set camera options */
	obj.camera = null;
	obj.cameraStream = null;
	obj.cameraConstraints = {video: true, audio: true};
	obj.peerStream = null;
	obj.enableMyCamera = 1;
	obj.testing = false;

	/* free variables for user's info */
	obj.config = {};

	obj.preventTwice = [];
	obj.eventsLoaded = false;
	obj.lessonFinished = false;

	/* call interval */
	obj.callInterval = false;
	obj.callAttempts = 0;
	obj.emergencyStop = false;

	/* ice servers */
	obj.iceServers = [{"url":"stun:global.stun.twilio.com:3478?transport=udp","username":null,"credential":null},
					{"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"6b224de937e4b2ae582a9e2e47509892991261364181404018f798a5468b02cb","credential":"Exw7oeRDK2KaKS4Y0dbRej1wDifr1HQev81qG1eIMvA="},
					{"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"6b224de937e4b2ae582a9e2e47509892991261364181404018f798a5468b02cb","credential":"Exw7oeRDK2KaKS4Y0dbRej1wDifr1HQev81qG1eIMvA="},
					{"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"6b224de937e4b2ae582a9e2e47509892991261364181404018f798a5468b02cb","credential":"Exw7oeRDK2KaKS4Y0dbRej1wDifr1HQev81qG1eIMvA="}];

	/* peer camera is to be disabled */
	obj.disablePeerCamera = 1;

	/* reconnection attempt limit */
	obj.reconnectAttemptLimit = 5;

	/* initialize connection */
	obj.init = function(successCB, failCB){
		element = this;
		try{
			/* try to connect to socket */
			element.initializeSocket(function(){
				if ($.isFunction(successCB)) { successCB(); }
			});
		} catch (err){
			if ($.isFunction(failCB)) {
				failCB({error: "reason_socket_fail", content: err});
			}
		}
	};

	obj.initializeSocket = function(successCB, failCB){
		element = this;

		element.socket = io.connect(element.signalHost + ":" + element.signalPort, {
			'reconnection': true,
			'reconnectionDelay': 5000,
			'reconnectionDelayMax': 5000
		});

		element.socket
		.off('connect').on('connect', function(){
			/* set socket ID */
			element.config.socketID = element.socket.id;

			/* execute callback */
			if ($.isFunction(successCB)) { successCB(); }
		})
		.off('reconnecting').on('reconnecting', function(number){
			console.warn('[SOCKET.IO] RECONNNECTION ATTEMPT: '+number);

			/* trigger fail callback */
			if (typeof failCB !== "undefined" && $.isFunction(failCB)) { failCB(); }

			/* if user aside from student or teacher */
			if (element.config.memberType !== "undefined" && element.config.memberType.match('admin|student-test')) { return; }

			/* send reconnect attempt code here */

			/* if attempt reaches 5 code here */
			// if (number == element.reconnectAttemptLimit && )

		})
		.off('disconnect').on('disconnect', function(code){
			console.warn('[SOCKET.IO] DISCONNECTED -> '+code);
			element.preventTwice = [];
		})
		.off('error').on('error', function(err){
			console.warn('[SOCKET.IO] ERROR -> '+err);
		});

	};

	obj.initializeCamera = function(successCB, failCB){
		element = this;

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUermeda || navigator.mozGetUserMedia || navigator.msGetUserMedia;

		if (typeof navigator.getUserMedia == "undefined") { return failCB(); }

		var cameraChecker = new $.Deferred();
		cameraChecker.done(function(stream){
			/* set my camera */
			$(constant.myCamera)
			.prop('src', window.URL.createObjectURL(stream))
			.attr('muted', true)
			.attr('poster', '');

			element.cameraStream = stream;

			if ($.isFunction(successCB)) { return successCB(); }

		})
		.fail(function(err){
			if ($.isFunction(failCB)) { return failCB(err); }
		});

		element.camera = navigator.getUserMedia(
			element.cameraConstraints,
			function(stream){ cameraChecker.resolve(stream); },
			function(err){
				element.cameraConstraints.video = false;
				element.cameraConstraints.audio = true;
				element.camera = navigator.getUserMedia(
					element.cameraConstraints,
					function(stream){ cameraChecker.resolve(stream); },
					function(err){ cameraChecker.reject(err); }
				);
			}
		);
	};

	obj.processIceServers = function(servers){
		element = this;
		var tmpServers = [];
		if (servers.length === 0) { return false; }
		servers.map(function(element, index){
			try{
				if (typeof element.username === "undefined" || typeof element.credential === "undefined"){
					tmpServers.push({url: element.url});
				} else {
					var turn = element.url.split(":");
					var turnUser = element.username;
					var turnAuth = element.credential;
					tmpServers.push({url: element.url, credential: turnAuth, username: turnUser});
				}
			} catch(e) { console.warn("[PROCESS SERVER ERROR] "+e); }
		});
		element.iceServers = tmpServers;
	};

	obj.initializePeer = function(cb){
		console.log("test initializePeer");
		element = this;
		connect.config.peerID = connect.config.chatHash + "-" + connect.config.memberType + "-" + util.getSalt(5);
		console.warn(connect.config);

		if (element.peer !== null){
			return false;
		}

		if (element.peer !== null && element.peer.disconnected === false){
			return console.warn("[PEERJS] peer is already connected");
		}

		element.peer = new Peer(connect.config.peerID, {
			host: element.signalHost,
			port: element.signalPort,
			debug: 2,
			path: "/peerjs",
			config: { iceServers : element.iceServers}
		});

		element.peer
		.off("open").on("open", function(id){
			element.config.peerID = id;

			if (element.config.memberType == "student") {
				element.initiateCall(0);

				// eventcommon.resetvide
			}

			if ($.isFunction(cb)) { cb(); }
		})
		.off("call").on("call", function(call){
			call.answer(element.cameraStream);
			call.on('stream', function(stream){
				if (element.config.memberType == "admin"){

				}
				element.peerStream = stream;
				element.callAttempts = 0;

				$(constant.otherCamera).prop("src", window.URL.createObjectURL(stream)).show();

				clearInterval(element.callInterval);

				if ($.isFunction(answeredTeacherCall)) { answeredTeacherCall(); }

			});
		})
		.off('close').on('close', function(){
			if (element.config.memberType.match("admin|student-test")) { return; }
			if ($.isFunction(videoDisconnected)) { videoDisconnected(); }
		})
		.off('error').on('error', function(error){
			console.warn("[PEERJS ERROR] "+error);
			try {
				element.peer.destroy();
			} catch(e){}
		});

	};

	obj.initiateCall = function(execAfter) {
		element = this;
		if (element.callInterval !== false){
			return console.warn("[PEERJS] call interval already set");
		}

		element.callInterval = setInterval(function(){
			if (element.callAttempts >= 3){
				element.resetCall();
				element.resetPeer();
			}

			eventCommon.sendCommand({command: "callStudent", content: connect.config, mode: "to"});

			element.callAttempts++;
			if (execAfter === 0) {
				element.resetCall();
				clearInterval(element.callInterval);
				return element.initiateCall(2000);
			}
		}, execAfter);
	};

	obj.resetCall = function() {
		element = this;
		clearInterval(element.callInterval);
		element.callAttempts = 0;
		element.callInterval = false;
	};

	obj.resetPeer = function(){
		element = this;
		try{
			element.peer.disconnect();
			eventCommon.removeCommand(["student_call"]);
		} catch(e){
			console.warn("[PEERJS] RESET PEER ERROR: "+e);
			element.peer = null;
		}
	};

	return obj;

})();