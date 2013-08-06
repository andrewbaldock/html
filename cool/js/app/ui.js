define(["jquery", "soundcloud"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      });
      require(['soundcloud'], function (soundcloud) {
      	$('#getuser button').click(function(soundcloud){
      		var usrInput = $('#getuser input').val();
      		alert(usrInput);
      		
      		SC.initialize({
    				client_id: usrInput,
    				redirect_uri: "http://andrewbaldock.com/callback.html",
  				});
  				
      	});
      });
  };
  aB.fn.ui();
});
