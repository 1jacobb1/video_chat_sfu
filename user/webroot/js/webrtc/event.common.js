var eventCommon = (function(){
  "use strict";
  var obj = {},
      element = null,
      timeInterval = null,
      minutes = 26,
      currentServerTime = null,
      serverTimeOffset = null;

  obj.memeberType = "";

  obj.init = function(cb){
    element.this;

    element.receiveCommands();

    if($.isFunction(cb)) { cb(); }
  }

  obj.receiveCommands = function(){
    if(!eventCommon.preventTwice('lesson_common_events')){
      return console.warn('[SOCKET] duplicate common events');
    }

    connect.socket
    .off('room.generalCommand').on('room.generalCommand', function(data){
      console.warn(data);

      switch(data.command){
        case "roomConnected":
          break;
        case "startLesson":
          break;
        default:

      }
    });

  };

  /**
  * function that prevent the duplication of command/events
  * @param cmd -> command
  * @return bool
  */
  obj.preventTwice = function(cmd){
    if($.inArray(cmd, connect.preventTwice) >= 0){
      return false;
    }
    /* push cmd */
    connect.preventTwice.push(cmd);
    return true;
  };


  obj.sendCommand = function(data, cb){
    connect.socket.emit('room.generalCommand', data, function(data){
      if($.isFunction(cb)) { cb(data); }
    });
  };

  obj.disconnectLesson = function(){
    if(connect.config.memeberType === "admin" || connect.config.memeberType === "student-test") { return; }
    if(connect.peer !== null) { connect.peer.disconnect(); }
    if(connect.socket !== null) { connect.socket.disconnect(); }
  };

  obj.disconnectVideo = function(){
    if(connect.config.memeberType === "admin" || connect.config.memeberType === "student-test") { return; }
    if(connect.peer !== null) { connect.peer.destroy(); }
  };

  obj.connectToRoom = function(cb){
    connect.socket.emit('common.connectToRoom', connect.config, cb);
  };

  obj.ongoingLesson = function(){
    if($.isFunction(ongoingLesson)) { ongoingLesson(); }
  };

  obj.toggleCamera = function(type, enable){
    var conf = connect.config;
  }


})();
