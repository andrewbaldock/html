define(["jquery", "jquery.alpha", "underscore.min","json2.min","backbone.min","jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
      
      		//show utils are loaded in console.
      		console.log("jquery:" + $);
      		console.log("underscore:" + _);
      		console.log("json2:" + JSON);
      		console.log("backbone:" + Backbone);

      		function toggleSpinner(){
      			$('#spinner').toggle('slowest');
      		}
      		
      		toggleSpinner();
      		
      		//APP BEGINS HERE
      		
      		
      		
        
    });
});
