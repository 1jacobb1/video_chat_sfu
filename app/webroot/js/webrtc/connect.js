var connect = (function(){
  "use strict";

  var con = {};
  var element = null;

  /* for default host */
  con.signalHost = constant.signalHost;
  con.signalPort = constant.signalPort;

  /* contains the active socket connection */
  con.socket = null;

  /* contains the active peer connection */
  con.peer = null;

  /* set camera */
  con.camera = null;
  con.cameraStream = null;
  con.cameraPeerStream = null;
  con.cameraConstraints = {video: true, audio:true};

  con.peerStream = null;

  /**
  * free variable
  * example usage for storing user info:
  * @param con.config.teacherID
  * @param con.config.userID
  * @param con.config.chatHash
  */
  con.config = {};

  con.preventTwice = [];
  con.eventsLoaded = false;
  con.lessonFinished = false;

  con.callInterval = false;
  con.callAttempts = 0;

  con.init = function(successCB, failCB){
    element = this;
    try{
      element.initializeSocket(function(){
        if($.isFunction(successCB)){ successCB(); }
      });
    }catch(err){
      if($.isFunction(failCB)){ failCB({error: "socket_failure", content:err}); }
    }
  };

  con.initializeSocket = function(callback){
    element = this;
    element.socket = io.connect(element.signalHost+":"+element.signalPort,{
      'reconnection': true,
      'reconnectionDelay': 5000,
      'reconnectionDelayMax': 5000
    });

    element.socket
    .off('connect').on('connect', function(){
      /* set socket id */
      element.config.socketID = element.socket.id;
      if($.isFunction(callback)){ callback(); }
    })
    /*.off('reconnecting').on('reconnecting', function(number){
      console.warn("[SOCKET.IO] RECONNECTION ATTEMPT "+number);
    })*/
    .off('disconnect').on('disconnect', function(){
      element.preventTwice = [];
    })
    .off('error').on('error', function(){});
  };

  return con;

})();
