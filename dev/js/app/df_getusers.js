define(["jquery", "json2", "app/df_auth"], function($) {
  aB.fn.df_getusers = function() {
      console.log('getting users');
      
      // get users
      require(['app/df_auth'], function () {
    		//dreamfactory is now authenticated

				$.ajax({
					type: "POST",
					url: 'https://dsp-song.cloud.dreamfactory.com/rest/db/users?app_name=soundora',
					dataType: "json",
					contentType: "application/json",
					success: function (response) {
							console.log("got users:" + response);
					},
					error: function (response, textStatus, xError) {
							console.log(response);
					},
					beforeSend: function (xhr) {
							xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
					}
				});
				
				
    	});
  };
  aB.fn.df_getusers();
});
