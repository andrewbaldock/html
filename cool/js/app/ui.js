define(["jquery", "soundcloud"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      });
      require(['jquery'], function ($) {
      	$('#getuser button').click(function(e){
      		e.preventDefault();
      		var usrInput = $('#getuser input').val();
      		alert(usrInput);
      	});
      });
  };
  aB.fn.ui();
});
