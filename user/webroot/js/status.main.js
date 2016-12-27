var statusMainJs = (function(){

	var obj = {};

	obj.setStatus = function(connectFlag){
		connectFlag = (connectFlag) ? connectFlag : 0;
		console.log(connectFlag);
		$.ajax({
			url: '/teacher/home/updateStatus',
			data: { teacherId: teacherId, connectFlag: connectFlag },
			type: 'POST'
		})
		.done(function(data){
			data = $.parseJSON(data);
			if (!data.error){
				var connectFlag = data.content.connectFlag;
				switch(connectFlag){
					case "1":
						window.location.href = '/teacher/chat';
						break;
					default:
						window.location.href = '/teacher/home';
				}
			}
		});

	};

	return obj;

})();