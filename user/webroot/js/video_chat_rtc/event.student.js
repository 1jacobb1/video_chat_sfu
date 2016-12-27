var eventStudent = (function(){
	var obj = {};
	var element = null;

	obj.previewMessage = function(data){
  		var memberType = data.memberType;
  		if (memberType == connect.config.memberType){
			$('.ul-messages').append('<li class="mar-btm"><div class="media-body pad-hor speech-right"><div class="speech"><p>'+data.message+'</p></div></div></li>');
  		} else {
  			$('.ul-messages').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>'+data.message+'</p></div></div></li>');
  		}
	};


	return obj;

})();