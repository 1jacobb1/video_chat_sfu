this is your room
<script type="text/javascript" src="/js/webrtc/socket.io.js"></script>
<script type="text/javascript" src="/js/webrtc/peer.min.js"></script>
<script type="text/javascript" src="/js/webrtc/constant.js"></script>
<script type="text/javascript" src="/js/webrtc/connect.js"></script>
<script type="text/javascript">
  $(document).ready(function(){
    initializeConfig();
    connect.init(function(){
    }, function(fail){
      console.warn(fail);
    });
  });
  function initializeConfig(){
    connect.config = {
      memeberType: "user",
      chatHash: "<?php echo $room['RoomOnair']['chat_hash']; ?>",
      userID: "<?php echo AuthComponent::User('User.id'); ?>",
      peerID: "USER-<?php echo AuthComponent::User('User.id'); ?>"
    };
  }
</script>
