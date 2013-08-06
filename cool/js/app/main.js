define(["jquery", "jquery.alpha", "underscore-min","json2","backbone","jquery.beta", "soundcloud", "app/ui"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
      
      		//show utils are loaded in console.
      		if(typeof $ !='undefined') {console.log("jquery loaded");}
      		
      		require(['underscore-min'], function (underscore) {
    				//underscore is now loaded.
    				if(typeof _ !='undefined') {console.log("underscore loaded");}
					});
      		if(typeof JSON !='undefined') {console.log("json2 loaded");}
      		if(typeof Backbone !='undefined') {console.log("backbone loaded");}
      		
      		function toggleSpinner(){
      			$('#spinner').toggle('slowest');
      		}
      		toggleSpinner();
      		
      		//APP BEGINS HERE
      		
      		
      		
        
    });
});
