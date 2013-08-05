// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, this app's custom code.

// declare the aB object
// fix for running locally and still loading remote js
var aB = {protofix:''};
if(location.protocol == "file:"){aB.protofix="http://"};

requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": 		aB.protofix + "ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
