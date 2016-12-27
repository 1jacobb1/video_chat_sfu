var eventCommon = (function(){
	"use strict";

	var obj = {},
		element = null,
		minutes = 26,
		currentServerTime = null,
		serverTimeOffset = null,
		logs = [],
		isSaving = false,
		debug = {};

	obj.timeInterval = null;
	obj.timeStop = false;
	obj.memberType = null;
	obj.videoEventsTriggered = false;

	

	/* initialize events */
	obj.init = function(callback){
		element = this;

		/* handler for receiving events */
		element.receiveCommands();

		/* execute callback function */
		if ($.isFunction(callback)) { callback(); }
	};

	obj.receiveCommands = function(){
		element = this;
		connect.socket
		.off('common.connectedToRoom').on('common.connectedToRoom', function(data){
			if (typeof joinedRoom !== "undefined" && $.isFunction(joinedRoom)) { joinedRoom(data); }
		})
		.off('room.userHasClass').on('room.userHasClass', function(data){
			if (typeof receiveUserHasClassChecker !== "undefined" && $.isFunction(receiveUserHasClassChecker)) { receiveUserHasClassChecker(data); }
		})
		.off('room.clearClassOccupants').on('room.clearClassOccupants', function(data){

		})
		.off('room.generalCommandSent').on('room.generalCommandSent', function(data){

		})
		.off('room.generalCommand').on('room.generalCommand', function(data){
			switch(data.command){
				case "roomConnected":
					if (connect.config.memberType == "admin" && data.content.memberType == "admin") {

					} else {
						element.startLesson(data.content)
					}
					break;
				case "startLesson":
					element.ongoingLesson();
					break;

				case "callStudent":
					if (typeof eventTeacher !== "undefined") { eventTeacher.callStudent(data); }
					break;

				case "sendChat":
					var content = data.content;
					var memberType = content.memberType;

					if (memberType === "student"){
						eventStudent.previewMessage(content);
					} else if (memberType === "teacher"){
						eventTeacher.previewMessage(content);
					} else {

					}
					break;	
				default:
			}
		});
	};

	obj.sendCommand = function(data){
		connect.socket.emit('room.generalCommand', data);
	};

	obj.disconnectLesson = function(){
		if (connect.config.memberType.match('admin|student-test')) { return; }
		if (connect.socket !== null) { connect.socket.disconnect(); }
	};

	obj.disconnectVideo = function(){
		if (connect.config.memberType.match('admin|student-test')) { return; }
		if (connect.peer !== null) { connect.peer.destroy(); }
	};

	obj.connectToRoom = function(callback){
		setTimeout(function(){ connect.socket.emit('common.connectToRoom', connect.config); }, 3000);
	};

	obj.startLesson = function(data){
		if (typeof peerJoinedRoom == "undefined") { return; }
		if ($.isFunction(peerJoinedRoom)) { peerJoinedRoom(data); }
		element.sendCommand({command: 'startLesson', content: connect.config}, function(){});
	};

	obj.ongoingLesson = function(){
		if ($.isFunction(ongoingLesson)) { ongoingLesson(); }
	};

	obj.resetVideoEvents = function(){
		element = this;
	};

	obj.preventTwice = function(command){
		if ($.inArray(command, connect.preventTwice) >= 0) {
			return false;
		}

		connect.preventTwice.push(command);
		return true;
	};

	obj.removeCommand = function(commands){
		if (typeof commands === undefined) { return console.warn("supplied invalid commands to remove"); }

		if (commands.length === 0) { return console.warn("invalid lenght"); }

		for (var i = 0;i < commands.length; i++){
			var tmpIdx = _.findIndex(connect.preventTwice, function(command) { return command == commands[i]; });
			if (tmpIdx < 0) { return; }
			connect.preventTwice.splice(tmpIdx, 1);
		}

		connect.preventTwice = _.filter(connect.preventTwice);
	};

	obj.sendChat = function(msg){
		element = this;
		connect.config.message = msg;
		connect.config.mode = "to";
		element.sendCommand({command: "sendChat", content: connect.config});
	};

	return obj;

})();