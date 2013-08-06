define(["jquery", "soundcloud"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      });
  };
  aB.fn.ui();
});
