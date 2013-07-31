/*----------------------------------------------------*
    __               __        __               _            
   / /________ _____/ /__ ___ / /____ _____    (_)__         
  / __/ __/ _ `/ __/  '_/(_-</ __/ _ `/ __/   / (_-<         
  \__/_/  \_,_/\__/_/\_\/___/\__/\_,_/_/ (_)_/ /___/         
                                          |___/              
   tealium loader: creates universal data
   object with page language and url, 
   then fires tealium tag. ~ abaldock 2013
 *----------------------------------------------------*/

// don't run twice
var trackstar_YOLO = '';

function trackStar () {
  trackstar_YOLO = 'fired';
  /*
    Cookie Utilities
  */
  readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {c = c.substring(1, c.length);}
      if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length, c.length);}
    }
    return null;
  };
  // cookie write
  writeCookie = function (name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    //document.cookie = name + "=" + value + expires + "; path=/;";   //for localhost
    document.cookie = name + "=" + value + expires + "; path=/; domain=mindjet.com";
  };

  /*
    Declarations
  */
  var mJ = {};
  mJ.url  = document.URL;            // ex: "http://www.mindjet.com/products/mindmanager"
  mJ.host = window.location.host;    // ex: "www.mindjet.com"
  mJ.path = window.location.pathname;// ex: "/products/mindmanager"

  // get page language
  if (typeof document.documentElement.lang != -1) {
    mJ.lang = document.documentElement.lang;
  } else {
    mJ.lang = 'en';
  }
  if (mJ.lang == "en_EU") {mJ.lang = "eu";}
  if (mJ.lang == "en_GB") {mJ.lang = "uk";}
  if (mJ.lang == "en_AU") {mJ.lang = "au";}

  // FSID = form submission id, critical for Eloqua
  mJ.FSID = readCookie("FSID");
  if (mJ.FSID == null) {
      var theDate = new Date;
      var theTime = theDate.getTime(); // length = 13 digits
      mJ.FSID = theTime + "WWW";
  }
  writeCookie("FSID", mJ.FSID, 30);		

  /*
    MINDJET environment
  */
  if ( (mJ.url.indexOf("www-dev") >= 0) || (mJ.url.indexOf("localhost") >= 0) || (mJ.url.indexOf("10.3.1.97") >= 0) ){
    mJ.environment = 	'dev';
  }
  if ( (mJ.url.indexOf("qe-wwwa") >= 0) || (mJ.url.indexOf("qe-signupa") >= 0) ) {
    mJ.environment = 	'qeA';
  }
  if ( (mJ.url.indexOf("qe-wwwb") >= 0) || (mJ.url.indexOf("qe-signupb") >= 0) ) {
    mJ.environment = 	'qeB';
  }
  if (mJ.url.indexOf("www-cms") >= 0) {
    mJ.environment = 'preprod';
    // stagingTest();
  }
  if ( (mJ.url.indexOf("www.mindjet.com") >= 0) || (mJ.url.indexOf("signup.mindjet.com") >= 0) ) {
    mJ.environment = 'prod';
    // stagingTest();
  }

  /*
    TEALIUM environment
  */
  mJ.tealiumEnv = "prod";  //default
  if (mJ.environment == "dev") {
    mJ.tealiumEnv = "qa";
  }
  if (mJ.environment == "qeA" || mJ.environment == "qeB") {
    mJ.tealiumEnv = "qa";
  }
  if (mJ.environment == "prod" || mJ.environment == "staging") {
    mJ.tealiumEnv = "prod";
  }
  // penultimate slash is environment declaration: can be dev, qa, or prod 
  mJ.tealiumPath = '//tags.tiqcdn.com/utag/mjet/main/' + mJ.tealiumEnv + '/utag.js';

  // 404 page... needs this otherwise can't tell we're on 404
  var is404 = false;
  var check404one =  document.getElementById('error');
  var check404two =  document.getElementById('error-message');
  if ( ( (typeof(check404one) != 'undefined' && check404one != null) ) && 
       ( (typeof(check404two) != 'undefined' && check404two != null) ) )
   {
      mJ.host = mJ.host + " 404_error"
  } // end 404

  /*
    TEALIUM UNIVERSAL DATA OBJECT
  */

  var utag_data = {
    "region_code" : mJ.lang,    // en, au, eu, uk, de, fr, ja
    "page_type"   : mJ.host,    // what mindjet.com host?
    "page_name"   : mJ.url      // full URL
  }

  // console output
  /*
  if (typeof console != -1) {
    console.log( JSON.stringify(utag_data) );
  }
  */

  /*
    FIRE the Tealium Tag
  */
  jQuery(function() {
    a=mJ.tealiumPath; // mJ variable here
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
  });

  /*
    LOAD /js/trackstar-tagging.js (webtrends step tagger)
    loaded here so it can be a separate file, but not have to be linked by hand in each page
  */
  var tsTaggingScript = document.createElement('script');
  tsTaggingScript.onload = function() {
    //alert("Script loaded and ready");
  };
  tsTaggingScript.src = "/js/trackstar-www.js";
  document.getElementsByTagName('head')[0].appendChild(tsTaggingScript);
  
}

// YOLO
if (trackstar_YOLO != 'fired') {
  trackStar();
};

