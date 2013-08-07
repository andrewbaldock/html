define(["jquery", "jquery.alpha", "jquery.beta", "app/df_auth", "json2", "underscore", "backbone", "app/ui" ], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha();
      
      		//show utils are loaded in console.
      		if(typeof $ !='undefined') {console.log("jquery loaded");}
      		if(typeof JSON !='undefined') {console.log("json2 loaded");}
      		if(typeof _ !='undefined') {console.log("underscore loaded");}
      		if(typeof Backbone !='undefined') {console.log("backbone loaded");}
      		
      		function toggleSpinner(){
      			$('#spinner').toggle('slowest');
      		}
      		toggleSpinner();

      		//APP BEGINS HERE
      		
      		
      		
        
    });
});
