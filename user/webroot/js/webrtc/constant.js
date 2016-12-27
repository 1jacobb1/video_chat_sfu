var constant = (function(){
  "use strict";

  /* set global object */
  var con = {};

  con.teacherMessage = (function(){
    var m = {};
    m.lessonStart = "レッスンが開始しました。";
		m.lessonEnd = "レッスンが終了しました。";
		m.lessonTimeOut = "レッスン時間が終了しました。";
		m.loginStudent = "受講者がログインしました。";
		m.logoutStudent = "受講者がログアウトしました。";
		m.logoutTeacher = "講師がログアウトしました。";
		m.failedConnect = "接続に失敗しました。";
		m.errorMessage = "接続できませんでした。頻発する場合はサポートまでご連絡ください。";
		m.errorWRTCMessage = "WebRTC未対応のブラウザか、デバイスへ接続できませんでした。";
		return m;
  })();

  con.studentMessage = (function(){
    var m = {};
    m.lessonStart = "Lesson has started.";
    m.lessonEnd = "Lesson finished.";
    m.lessonTimeOut = "Lesson is over.";
    m.loginStudent = "Student has logged in.";
    m.logoutStudent = "Student has logged out.";
    m.logoutTeacher = "Teacher has logged out.";
    m.failedRegistration = "Connection failed.";
    m.failedConnect = "Connection failed.";
    m.errorMessage = "Unexpected error has occurred, please report to admin.";
    m.errorWRTCMessage = "WebRTC wasn't supported or Media access was denied.";
		return m;
  })();

  con.signalHost = "dev2node.nativecamp.net";
  con.signalPort = 3000;

  con.myCamera = "#ownVideo";
  con.peerCamera = "#othresVideo";

  return con;
})();
