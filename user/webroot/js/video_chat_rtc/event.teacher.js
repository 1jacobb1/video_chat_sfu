var eventTeacher = (function(){

	var element = null;
	var obj = {};

	obj.callStudent = function(data){
		if ($.isFunction(peerJoinedRoom)) { peerJoinedRoom(); }

		var peerID = (typeof data.content.peerID === "undefined") ? false: data.content.peerID;

		if (peerID === false){
			return console.warn("[PEERJS] STUDENT IS CALLING BUT SUPPLIED INVALID PEERID");
		}

		if (connect.peer === null) {
			connect.resetPeer();
			connect.initializePeer();
			return console.warn("[PEERJS] STUDENT IS CALLING BUT YOU'RE NOT CONNECTED TO SERVER");
		}

		console.log('current peer connections');
		var currentPeerConnections =  _.countBy(connect.peer.connections, function(item){ return (typeof item !== 'undefined' || item !== null) });
		console.debug(currentPeerConnections);

		if (!eventCommon.preventTwice('student_call')) {
			return console.warn('[PEERJS] CALL EVENT WAS ALREADY RECEIVED');
		}

		if (currentPeerConnections > 0){
			connect.resetPeer();
			connect.initializePeer();
			return console.warn('[PEERJS] STUDENT CALLED YOU BUT YOU HAVE ALREADY CONNECTED TO OTHER STUDENT');
		}

		var call = connect.peer.call(peerID, connect.cameraStream);

		call.on('stream', function(stream){
			eventCommon.removeCommand(['student_call']);

			connect.peerStream = stream;

			if (typeof eventCommon !== undefined){

			}

			$(constant.otherCamera).prop('src', window.URL.createObjectURL(stream)).show();


		});
	};

	obj.previewMessage = function(data){
		console.log(data);
		var memberType = data.memberType;
  		if (memberType == connect.config.memberType){
			$('.ul-messages').append('<li class="mar-btm"><div class="media-body pad-hor speech-right"><div class="speech"><p>'+data.message+'</p></div></div></li>');
  		} else {
  			$('.ul-messages').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>'+data.message+'</p></div></div></li>');
  		}
	};

	return obj;

})();