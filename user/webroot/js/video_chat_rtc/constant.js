var constant = (function(){
	"use strict";

	/* set global obj */
	var obj = {};

	/* host and port */
	obj.signalHost = "localhost";
	obj.signalPort = 3030;

	/* camera streams */
	obj.myCamera = "#ownVideo";
	obj.otherCamera = "#othersVideo";

	/* camera frame rate */
	obj.frameRate = 30;
	obj.frameWidth = 320;
	obj.frameHeight = 320;

	/* set bit rate */
	obj.bitRate = 200;

	/* return obj */
	return obj;

})();