define(["jquery", "json2"], function($) {
  aB.fn.df_auth = function() {
      console.log('dreamfactory loaded');
      
      // authenticate dreamfactory.com cloud app backend with system user
      
      $.ajax({
        type: "POST",
        url: 'https://dsp-song.cloud.dreamfactory.com/rest/user/session?app_name=soundora',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:'s0und0r4'}),

        success: function (response) {
        		console.log("got session id from dreamfactory:" + response.session_id);
        		aB.sessionId = response.session_id;
        		
        		//now load users
        		$.ajax({
							type: "GET",
							url: 'https://dsp-song.cloud.dreamfactory.com/rest/db/users?app_name=soundora',
							dataType: "json",
							contentType: "application/json",
							success: function (response) {
								console.log("got users:");
								console.log(response);
							},
							error: function (response, textStatus, xError) {
								console.log(response);
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
							}
						});
        },
        
        error: function (response, textStatus, xError) {
            console.log(response.responseText);
        } 
        
    	});
    	
  };
  aB.fn.df_auth();
});
