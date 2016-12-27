<script type="text/javascript" src="/user/js/video_chat_rtc/socket.io.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/peer.min.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/constant.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/util.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/connect.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/event.common.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/event.teacher.js"></script>
<script type="text/javascript" src="/user/js/video_chat_rtc/event.student.js"></script>
<script>
	var studentConnected = false;
	$(function(){
		connect.config = {
			memberType: "teacher",
			teacherId: "<?php echo $teacherId; ?>",
			studentId: "<?php echo $studentId; ?>",
			chatHash: "<?php echo $chatHash; ?>"
		};

		connect.init(function(conn){
			connect.initializeCamera(function(){
				eventCommon.init();
				eventCommon.connectToRoom();
				allowChat();
			}, function(){
				cameraCheckInterval = setInterval(function(){
					connect.initializeCamera(function(){
						clearInterval(cameraCheckInterval);
						window.location.reload();
					}, function(){});
				}, 3000);
			});

			$('#mychat').removeAttr('hidden');

		}, function(err, conn){
			console.warn("[SERVER CONNECTION] UNABLE TO CONNECT TO SERVER");
		});

	});

	function joinedRoom(params){
		if (params.error){
			return window.location.href="/teacher/home/?chat_close";
		}
	}

	function peerJoinedRoom(data){
		/* set student connection to true */
		studentConnected = true;
	}

	function ongoingLesson(){
	}

	function allowChat(){
		$('#submit-chat').click(function(){
  		var msg = $.trim($('#input-chat').val());
  		if (msg !== ""){
  			eventCommon.sendChat(msg);
  			$('#input-chat').val('');
  		}
  	});

  	$('#input-chat').keypress(function(e){
  		if (e.which === 13){
  			var msg = $.trim($('#input-chat').val());
  			if (msg !== "") {
  				eventCommon.sendChat(msg);
  				$('#input-chat').val('');
  			}
  		}
  	});
	}
</script>
