define(["jquery"], function($) {
  $.fn.alpha = function() {
      return this.append('<p>BEGINNING LOAD</p>');
  };
});
