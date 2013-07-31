/* mindjet.js - andrew baldock 2013 */
/*  
	jQuery extension -- check to see if something exists
	stackoverflow.com/questions/920236/how-can-i-detect-if-a-selector-returns-null
	Used like:  jQuery("#notAnElement").exists();
*/


jQuery.fn.exists = function () {
	return this.length !== 0;
}


/*
	DECLARE VARIABLES
*/
	// mindJet global object
	var mindJet = {};
	mindJet.locales = ['en','en_GB','en_EU','de','fr','ja','en_AU'];
	mindJet.protocol = location.protocol + '//';
	mindJet.loggedIn = false;
	mindJet.url = document.URL;

	if ( jQuery('html').attr('lang') == undefined ) {
    	mindJet.localeCode = 'en';
    jQuery('html').attr('lang','en');
  } else {
    mindJet.localeCode = jQuery('html').attr('lang');
    }
	mindJet.lang = mindJet.localeCode.toLowerCase();
	if (mindJet.lang == 'en_au' || mindJet.lang == 'en-au' ) {mindJet.lang = 'au';}
	if (mindJet.lang == 'en_eu' || mindJet.lang == 'en-eu' ) {mindJet.lang = 'eu';}
	if (mindJet.lang == 'en_gb' || mindJet.lang == 'en-gb' || mindJet.lang == 'en_uk' || mindJet.lang == 'en-uk' ) {mindJet.lang = 'uk';}
  
	// tealium switch
	var useTealium = true;

	/*	MAINTENANCE TOGGLE:  
	 *	- Should be TRUE for signup to work
	 *  - set to FALSE for maintenance mode, which will stop signup
	 */
	var maintenanceModeNo = true;  // SHOULD USUALLY BE TRUE
	
	/*
	  Footer callout link here:
	*/
		mindJet.footCalloutLink = 'http://blog.mindjet.com';
	
	/* - - - - - - - - - - - - - - - - - - - - 
	  dl-links
	  CURRENT VERSION DOWNLOAD URLS GO HERE
	*/	
	  // WINDOWS exes
	  mindJet.dl_win_en = "/mm-win-exe-en";
	  mindJet.dl_win_de = "/mm-win-exe-de";
	  mindJet.dl_win_fr = "/mm-win-exe-fr";
	  mindJet.dl_win_ja = "/mm-win-exe-ja";
	  
	  // WINDOWS release notes
	  mindJet.rn_win_en = "/latest-release-notes-windows-english";
	  mindJet.rn_win_de = "http://onlinehelp.mindjet.com/help/MJWin/11_2/GER/documents/Mindjet_for_Windows_Release_Notes.pdf";
	  mindJet.rn_win_fr = "http://onlinehelp.mindjet.com/help/MJWin/11_2/FRE/documents/Mindjet_for_Windows_Release_Notes.pdf";
	  mindJet.rn_win_ja = "/latest-release-notes-windows-english";
	  
	  // MAC DMG all languages .
	  mindJet.dl_mac    = "/mm-mac-dmg";
	/* - - - - - - - - - - - - - - - - - - - - */ 
	
/*
	UTILITIES
*/

  mindJet.loadscript = function (url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

	//Get URL Params
	mindJet.getUrlParam = function (paramName) {
		paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + paramName + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);
		if (results === null) { 
			return ""; 
		} else {
			return results[1];
		}
	};
	//cookie read
	mindJet.readCookie = function (name) {
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
	mindJet.writeCookie = function (name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}
		//document.cookie = name + "=" + value + expires + "; path=/;";   //for localhost
		document.cookie = name + "=" + value + expires + "; path=/; domain=mindjet.com";
	};

	// removeParameter - returns doc.URL.search minus the param in question
	function removeParameter(b) { 
		fullQString = window.location.search.substring(1);
		paramCount = 0;
		queryStringComplete="?";
		if(fullQString.length>0){
			paramArray=fullQString.split("&");
			for(i=0;i<paramArray.length;i++){
				currentParameter=paramArray[i].split("=");
				if(currentParameter[0]!=b) {
					if(paramCount>0){
						queryStringComplete=queryStringComplete+"&";
					}
					queryStringComplete=queryStringComplete+paramArray[i];
					paramCount++;
				}
			}
		}
		var a=self.location.pathname+queryStringComplete;
		return a;
	}
	
	// takes two params, any URL and the parameter name
	function removeVariableFromURL(url_string, variable_name) {
		var URL = String(url_string);
		var regex = new RegExp( "\\?" + variable_name + "=[^&]*&?", "gi");
		URL = URL.replace(regex,'?');
		regex = new RegExp( "\\&" + variable_name + "=[^&]*&?", "gi");
		URL = URL.replace(regex,'&');
		URL = URL.replace(/(\?|&)$/,'');
		regex = null;
		return URL;
  	}

	function clearTheEmailForm() {
			jQuery('input#email').val('');
			jQuery('div#form-message').html('');
	}


/*
	LOCALE 
*/


  // locale sherriff -- now does with /__/ lang directory instead of ?lang=
  // giz a cookie
  //mindJet.writeCookie('lang', mindJet.lang, 365);
  jQuery('a').each(function() {
		 var _href = jQuery(this).attr("href");
		 var attrID = "none";
		 if (typeof jQuery(this).attr('id') != "undefined") {
		 	 attrID = jQuery(this).attr('id');
		 }
		 var pageLang = mindJet.lang;
		 var langDir  = mindJet.lang;
		 if ( (pageLang == "en_eu") || (pageLang == "en-eu") || (pageLang == "eu")  ) { langDir = "eu";}
		 if ( (pageLang == "en_uk") || (pageLang == "en-uk") || (pageLang == "uk")  ) { langDir = "uk";}
		 if ( (pageLang == "en_gb") || (pageLang == "en-gb") || (pageLang == "gb")  ) { langDir = "uk";}
		 if ( (pageLang == "en_au") || (pageLang == "en-au") || (pageLang == "au")  ) { langDir = "au";}
		 langDir = "/" + langDir.substr(0, 2);
		 var myRegExp = new RegExp("^(/au/|/eu/|/de/|/fr/|/ja/|/uk/)");
		 
		 var newUrl = removeVariableFromURL(_href, 'lang');
		 if(myRegExp.test(_href)) {
			 newUrl = _href.replace(myRegExp,langDir);
		 } else if (langDir != "/en") {
			 newUrl = langDir + _href;
				}
			// blacklist
		 if (typeof _href != 'undefined') {
		 	var firstChar = _href.charAt(0); 
		 	if ( (firstChar != "#") && (_href.indexOf('/au/') == -1)  && (_href.indexOf('/eu/') == -1)  && (_href.indexOf('/de/') == -1)  && (_href.indexOf('/fr/') == -1)  && (_href.indexOf('/ja/') == -1)  && (_href.indexOf('/uk/') == -1)  && (_href.indexOf('resellers/program_notice') == -1) && (_href.indexOf('http') == -1)  && (_href.indexOf('mailto') == -1)  && (_href.indexOf('chat') == -1)  &&  (_href.indexOf('download.mindjet.com') == -1)  && (attrID.indexOf('flag') == -1) ) {
				jQuery(this).prop("href", newUrl); 
		 	}
		 }
	});
	


/*
	ENVIRONMENT
*/

	/* //staging test
	mindJet.staging = false;
	function stagingTest() {
		if ( mindJet.url.indexOf("www.mindjet.com") >= 0) {
			jQuery.ajax({
  				url: '/1-this-is-STAGING/index.html',
  				success: function(data) {
    					jQuery('body').append('<div id="staging-message">STAGING</div>');
    					mindJet.environment = "staging";
  				}
			});
		}
	} */


	if ( (mindJet.url.indexOf("www-dev") >= 0) || (mindJet.url.indexOf("localhost") >= 0) || (mindJet.url.indexOf("10.3.1.97") >= 0)  ){
		mindJet.environment = 	'dev';
		mindJet.envBase =   	 mindJet.protocol + 'www-dev.mindjet.net/';
		mindJet.envSecure = 	'https://secure-dev.mindjet.net/';
		mindJet.envStore =   	'https://secure-dev.mindjet.net/';
		mindJet.ConnectLogin = 	'http://dev-visiona.mindjet.net/';
		mindJet.envConnectBase= 'https://dev-visiona.mindjet.net/';
		mindJet.envCohumanBase= 'https://action-dev.mindjet.net';
		mindJet.engageAppId =	'lnipgddhgmmebbkcbkfd';
		mindJet.engageAppUrl =	'https://mindjet-dev.rpxnow.com';
		mindJet.signupHost = 	'https://qe-signupa.mindjet.net';
		mindJet.signup = 		'https://qe-signupa.mindjet.net/signup/form-mjpd';
		mindJet.signupOffline = '/maintenance/signup-offline';
	}

	if ( (mindJet.url.indexOf("qe-wwwa") >= 0) || (mindJet.url.indexOf("10.3.1.121") >= 0) ) {
		mindJet.environment = 	'qeA';
		mindJet.envBase =    	 mindJet.protocol + 'qe-wwwa.mindjet.net/';
		mindJet.envSecure = 	'https://qe-securea.mindjet.net/';
		mindJet.envStore =   	'https://qe-securea.mindjet.net/';
		mindJet.ConnectLogin = 	'http://qe-visiona.mindjet.net/';
		mindJet.envConnectBase= 'https://qe-visiona.mindjet.net/';
		mindJet.envCohumanBase= 'https://action-qa.mindjet.net';
		mindJet.engageAppId =	'lnipgddhgmmebbkcbkfd';
		mindJet.engageAppUrl =	'https://mindjet-dev.rpxnow.com';
		mindJet.signupHost = 	'https://qe-signupa.mindjet.net';
		mindJet.signup = 		'https://qe-signupa.mindjet.net/signup/form-mjpd';
		mindJet.signupOffline = '/maintenance/signup-offline';
	}
	if ( (mindJet.url.indexOf("qe-wwwb") >= 0) || (mindJet.url.indexOf("10.3.1.122") >= 0) ) {
		mindJet.environment = 	'qeB';
		mindJet.envBase =    	 mindJet.protocol + 'qe-wwwb.mindjet.net/';
		mindJet.envSecure = 	'https://qe-secureb.mindjet.net/';
		mindJet.envStore =   	'https://qe-secureb.mindjet.net/';
		mindJet.ConnectLogin = 	'http://qe-visionb.mindjet.net/';
		mindJet.envConnectBase= 'https://qe-visionb.mindjet.net/';
		mindJet.envCohumanBase= 'https://action-qa.mindjet.net';
		mindJet.engageAppId =	'lnipgddhgmmebbkcbkfd';
		mindJet.engageAppUrl =	'https://mindjet-dev.rpxnow.com';
		mindJet.signupHost = 	'https://qe-signupb.mindjet.net';
		mindJet.signup = 		'https://qe-signupb.mindjet.net/signup/form-mjpd';
		mindJet.signupOffline = '/maintenance/signup-offline';
	}
	if (mindJet.url.indexOf("www-cms") >= 0) {
		mindJet.environment = 'preprod';
		// stagingTest();

		mindJet.envBase = mindJet.protocol + 'www.mindjet.com/';
		mindJet.envSecure = 	'https://secure.mindjet.com/';
		mindJet.envStore = 		'https://secure.mindjet.com/';
		mindJet.ConnectLogin = 	'http://vision.mindjet.com/';
		mindJet.envConnectBase= 'https://vision.mindjet.com/';
		mindJet.envCohumanBase= 'https://action.mindjet.com';
		mindJet.engageAppId = 	'ofebjkbaligdlaegghfd';
		mindJet.engageAppUrl = 	'https://login.mindjet.com';
		mindJet.signupHost = 	'https://signup.mindjet.com';
		mindJet.signup = 		'https://signup.mindjet.com/signup/form-mjpd';
		mindJet.signupOffline = '/maintenance/signup-offline';
	}
	if ( (mindJet.url.indexOf("www.mindjet.com") >= 0) || (mindJet.url.indexOf("172.16.200.101") >= 0) ) {
		mindJet.environment = 'prod';
		// stagingTest();

		mindJet.envBase =    	mindJet.protocol + 'www.mindjet.com/';
		mindJet.envSecure = 	'https://secure.mindjet.com/';
		mindJet.envStore =   	'https://secure.mindjet.com/';
		mindJet.ConnectLogin = 	'http://vision.mindjet.com/';
		mindJet.envConnectBase= 'https://vision.mindjet.com/';
		mindJet.envCohumanBase= 'https://action.mindjet.com';
		mindJet.engageAppId =	'ofebjkbaligdlaegghfd';
		mindJet.engageAppUrl =	'https://login.mindjet.com';
		mindJet.signupHost = 	'https://signup.mindjet.com';
		mindJet.signup = 		'https://signup.mindjet.com/signup/form-mjpd';
		mindJet.signupOffline = '/maintenance/signup-offline';
	}





	// handle errant campids
	var mjCampID_redirector = function() {
		var mjCampID = mindJet.getUrlParam('campID');
		if (mjCampID == "2644") {window.top.location = mindJet.envConnectBase + "#!&view=am";}
		if (mjCampID == "2647") {window.top.location = mindJet.envConnectBase + "#!&view=cm";}
	};
	mjCampID_redirector();
	
	// environmentalize the PROJECT DIRECTOR signup
	if (maintenanceModeNo == true) {
		// normal production mode
	  	var queryString = '';
		// append incoming parameters to trialbuttons
		if (typeof window.location.search != 'undefined' & window.location.search !='') {
			var queryString = '&' + window.location.search.replace('?', '');
		} 
		if ( jQuery('a[href*="signup/form"]').exists() ) {
			jQuery('a[href*="signup/form"]').prop('href', mindJet.signup + '?lang=' + mindJet.localeCode + queryString);
		}
		if ( jQuery('iframe[src*="signup/form"]').exists() ) {
			if ( jQuery('iframe[src*="signup/form"]').prop('src').indexOf('lyte') != -1) {
				jQuery('iframe[src*="signup/form"]').prop('src', mindJet.signup + '?lang=' + mindJet.localeCode + "&lyte=yes" + queryString);
		}
			if ( jQuery('iframe[src*="signup/form"]').prop('src').indexOf('mini') != -1) {
				jQuery('iframe[src*="signup/form"]').prop('src', mindJet.signup + '?lang=' + mindJet.localeCode + "&mini=yes" + queryString);
			}
		}
		
	} else {
		// maintenance mode
		jQuery('a[href*="signup"]').prop('href', mindJet.signupOffline + '?lang=' + mindJet.localeCode);	
	}	

	//environmentalize the login
	jQuery('a[href*="vision.mindjet.com"]').prop('href', mindJet.ConnectLogin + '?lang=' + mindJet.localeCode);
	
	/*
		GREENZONE headers & footers
	*/
	
	jQuery('#callout-usa').remove();
	
	if (mindJet.lang == "en") {
		jQuery('#callout-intl').remove();
		jQuery('#navbar-intl').remove();
		jQuery('#navbar-ja').remove();
		jQuery('#footer-intl').remove();
	}
	if (mindJet.lang == "ja") {
		jQuery('#navbar-intl').remove();
		/* jQuery('#navbar-us').remove();
		jQuery('#footer-us').remove(); */
	    jQuery('#navbar-ja').css('display','block');
	}
	if (mindJet.lang != "en" && mindJet.lang != "ja") {
		jQuery('#navbar-us').remove();
		jQuery('#navbar-ja').remove();
		jQuery('#footer-us').remove();
	}
	
	

	/* 	salesforce liveagent prefs
	 * 	http://www.salesforce.com/us/developer/docs/live_agent_dev/live_agent_dev_guide.pdf
	 *  this code works hand in hand with sf-chat-buttons.js
	 *  NOTE: US Salesforce chat changed 5-2013 per A.Walne.  
	 *  New US chat runs via Tealium
	 */

	var __ALC_Deployment = 0;

	//us, au english
	if /*( (mindJet.localeCode == "en") ||*/ (mindJet.localeCode == "en_AU") /*)*/ {
		__ALC_Deployment = 9799;
	}
	//emea english
	if ( (mindJet.localeCode == "en_EU") || (mindJet.localeCode == "en_GB") ) {
		__ALC_Deployment = 10884;
	}
	//german
	if (mindJet.localeCode == "de") {
		__ALC_Deployment = 9717;
	}
	//french
	if (mindJet.localeCode == "fr") {
		__ALC_Deployment = 10916;
	}
	//seal the deal
	if (__ALC_Deployment > 0) {
		document.write(unescape("%3Cscript src='"+document.location.protocol+"//depot.liveagentforsalesforce.com/app/js/lt.js' type='text/javascript'%3E%3C/script%3E"));
	}
	// end salesforce liveagent chat for AU, EU, UK, DE, FR.
	// US chat is handled in Tealium
	

/*  BEGIN DOC READY  */

jQuery(document).ready(function($) {	

  //intl lang selector
  jQuery("#nav-language").mouseover(function() {
    jQuery("#nav-language ul").addClass('active');
  }).mouseout(function(){
    jQuery("#nav-language ul").removeClass('active');
  });



	// mobile email capture form
	if ( jQuery('#mobile').exists() ) {
		function putASpinnerInHere() {
			jQuery('#form-message').html('<center><img src="/img/ajax-loader_30x30.gif"></center>');
		}
		var validator = new FormValidator('12_NOV15_GBL_MJP_NT_Email_for_Mobile', [{
			name: 'email',
			rules: 'required|valid_email'
		}], function(errors, event) {
			if (errors.length > 0) {
				jQuery('div#form-message').html('Oops!  Please enter a valid email address.').css({'color' : 'red', 'position' : 'relative', 'left' : '100px', 'top' : '-37px', 'line-height' : '20px', 'width' : '118px'});

			} else {
				jQuery("#mobile-form").submit();
				jQuery('div#form-message').html('Thank you!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="color:#555" onclick="clearTheEmailForm();">&#8617;</a>').css({'color' : 'green', 'position' : 'relative', 'left' : '100px', 'top' : '-30px'});
			}
		});
		jQuery('#mobile-form').css('visibility', 'visible');
	}

	//environmentalize links to secure store
		if ( (mindJet.environment != 'prod') && (jQuery('a[href*="secure.mindjet.com"]').exists() ) ) {
			var getStoreUrl1 = mindJet.envStore;
			var getStoreUrl = getStoreUrl1.substring(0, getStoreUrl1.length-1);
			jQuery('a[href*="secure.mindjet.com"]').each(function() {
				this.href = this.href.replace(/^https:\/\/secure\.mindjet\.com/, getStoreUrl);
			});
		}

	// superbox the signup form...but not on greenzone pages
	if ( (jQuery('.try-button').exists() || jQuery('.tryButton').exists() || jQuery('#home-try-button').exists() ) && !jQuery('body.greenzone').exists() && !jQuery('body.signup-landing-page').exists() ) {
		  jQuery('.try-button').attr('rel','superbox[iframe][405x585]');
		  jQuery('.tryButton').attr('rel','superbox[iframe][405x585]');
		  jQuery('#home-try-button').attr('rel', '');
		  jQuery(function(){
			jQuery.superbox();
		  });
	} else {
		if (typeof oB !='undefined') {	
			// orangebox settings (signup lightbox)
			// http://davidpaulhamilton.net/orangebox/api-customization
	  		oB.settings.contentBorderWidth = 0;
    		oB.settings.contentRoundedBorder = false;
    		oB.settings.fadeControls = false;
    		oB.settings.addThis = false;
			oB.settings.overlayOpacity = 0.80;
      		oB.settings.contentMaxSize = [596,403];
      		oB.settings.contentMinSize = [595,402];
      	}
		jQuery('a[href*="/signup/form"]').prop('data-ob_iframe','true').prop('data-ob','lightbox').prop('rel','lightbox[iframe]');
		//jQuery('.try-button').attr('data-ob_iframe','true').attr('data-ob','lightbox').attr('rel','lightbox[iframe]');
		//jQuery('.tryButton').attr('data-ob_iframe','true').attr('data-ob','lightbox').attr('rel','lightbox[iframe]');
	}	

	/*
			locale switching for middleman
	*/
	if (mindJet.url.indexOf("localhost") >= 0) {
		var langParam = mindJet.getUrlParam('lang');
		var path = window.location.pathname;
		var final_destination = -1;
		var goTo = path.replace('eu/','');
			goTo = goTo.replace('uk/','');
			goTo = goTo.replace('de/','');
			goTo = goTo.replace('fr/','');
			goTo = goTo.replace('au/','');
			goTo = goTo.replace('ja/','');
		if (langParam == 'en') { final_destination	= goTo; }
		if (langParam == 'en_EU') { final_destination = '/eu' + path;}
		if (langParam == 'en_GB') { final_destination = '/uk' + path;}
		if (langParam == 'en_AU') { final_destination = '/au' + path;}
		if (langParam == 'de') { final_destination = '/de' + path;}
		if (langParam == 'fr') { final_destination = '/fr' + path;}
		if (langParam == 'ja') { final_destination = '/ja' + path;}

		if (final_destination != -1) {
			window.location = final_destination;
		}
	}
	
    // conspire banner in footer
	if (mindJet.lang == "en" && jQuery('nav.upper-meta-nav').exists() ) {
		jQuery('footer div.callout').unbind('click');
		jQuery('footer div.callout').bind('click',function () {
  			window.location = mindJet.footCalloutLink;
		});
	}

	//secondary-nav for greenzone us pages
	if (mindJet.lang == 'en' && jQuery('.secondary-nav').exists() ) {
	  jQuery('header#billboard').css('padding','20px 0');
	  jQuery('.secondary-nav').css('top','151px').css('position','absolute').css('z-index','0');
	};
	
	//tertiary-nav for greenzone us pages
	if (mindJet.lang == 'en' && jQuery('.tertiary-nav').exists() ) {
		//jQuery('.tertiary-nav').css('top','151px').css('position','absolute').css('z-index','0');
	}
	
    //tertiary-nav for mobile us pages
    if (mindJet.lang == 'en' && jQuery('.products_mobile_index').exists() ) {
		jQuery('.tertiary-nav').css('height','45px').css('border','1px solid #cbd1d3').css('position','absolute').css('z-index','1');
	}
	
	//tertiary-nav for /products/mindjet-for-web/
	if(jQuery('body.products_mindjet-for-web_index').exists()  && mindJet.lang == 'en') {
	    jQuery('.tertiary-nav').css('height','45px').css('border','1px solid #cbd1d3').css('position','absolute').css('z-index','1');
	}
	
	//remove top links for mindmanager page
	/* if (jQuery('body#product-mindmanager.products_mindmanager').exists() ) {
		jQuery('header div.gz-full-width.black').remove();
		jQuery('header div.gz-full-width.white').css('padding','15px 0');
		jQuery('nav.main-nav').css('visibility','hidden');
	} */
	
	
	// load up the products/mobile content into products/mindmanager/mindmanager-for-mobile/
	// if ( jQuery('.products_mindmanager_mindmanager-for-mobile').exists()  ) {
	//   jQuery('#mobile-content').load('/products/mobile/index.html section#main');
	//}

	// load that hot news... but not into greenzone pages
	if ( jQuery('#hotnews').exists() && !jQuery('body.greenzone').exists() && !jQuery('body.signup-landing-page').exists() ) {
		if (mindJet.localeCode == 'de') {jQuery("div#hotnews").load("/hotnews/hotnews-de.html");}
		if (mindJet.localeCode == 'fr') {jQuery("div#hotnews").load("/hotnews/hotnews-fr.html");}
		if ((mindJet.localeCode != 'de') && (mindJet.localeCode != 'fr')) {
				jQuery('head').append('<link rel="stylesheet" href="/css/hotnews.css" type="text/css" />');
				jQuery('#hotnews').rssfeed('http://delicious.com/v2/rss/parkertrewin', {
					limit: 3,
					header: false,
					dateformat: 'date'
				});
		}
	 }
	 

	// load up press reviews
	if ( jQuery('#about').exists() && (document.URL.indexOf('media-center') != -1) ) {
		var gotIt1 = false;
		if ( jQuery('html').attr('lang') == "de" ) {
			jQuery('#inthenews-list').load("/de/press/reviews");
			gotIt1 = true;
		}
		if ( jQuery('html').attr('lang') == "fr" ) {
			jQuery('#inthenews-list').load("/fr/press/reviews");
			gotIt1 = true;
		}
		if ( jQuery('html').attr('lang') == "ja" ) {
			jQuery('#inthenews-list').load("/ja/press/reviews");
			gotIt1 = true;
		}
		if ( jQuery('html').attr('lang') == "en_EU" ) {
			jQuery('#inthenews-list').load("/eu/press/reviews");
			gotIt1 = true;
		}
		if ( jQuery('html').attr('lang') == "en_GB" ) {
			jQuery('#inthenews-list').load("/uk/press/reviews");
			gotIt1 = true;
		}
		if ( jQuery('html').attr('lang') == "en_AU" ) {
			jQuery('#inthenews-list').load("/au/press/reviews");
			gotIt1 = true;
		}
		if (gotIt1 === false) {
			jQuery('#inthenews-list').load("/press/reviews");
		}
	}

	// load up press releases
	if ( jQuery('#about').exists() && (document.URL.indexOf('press-releases') != -1) ) {
		var gotIt2 = false;
		if ( jQuery('html').attr('lang') == "de" ) {
			jQuery('#release-list').load("/de/press/releases");
			gotIt2 = true;
		}
		if ( jQuery('html').attr('lang') == "fr" ) {
			jQuery('#release-list').load("/fr/press/releases");
			gotIt2 = true;
		}
		if ( jQuery('html').attr('lang') == "ja" ) {
			jQuery('#release-list').load("/ja/press/releases");
			gotIt2 = true;
		}
		if ( jQuery('html').attr('lang') == "en_EU" ) {
			jQuery('#release-list').load("/eu/press/releases");
			gotIt2 = true;
		}
		if ( jQuery('html').attr('lang') == "en_GB" ) {
			jQuery('#release-list').load("/uk/press/releases");
			gotIt2 = true;
		}
		if ( jQuery('html').attr('lang') == "en_AU" ) {
			jQuery('#release-list').load("/au/press/releases");
			gotIt2 = true;
		}
		if (gotIt2 === false) {
			jQuery('#release-list').load("/press/releases", function() {
					//temporarycallback to nuke these links
				jQuery('a[href*="2013-01-15"]').closest('tr').remove();
			});
		}
	} 

	// load up awards
	if ( jQuery('#about').exists() && (document.URL.indexOf('awards') != -1) ) {
	    var gotIt3 = false;
	    if ( jQuery('html').attr('lang') == "de" ) {
		jQuery('#awards-list').load("/de/press/awards #mainfull");
		gotIt3 = true;
	    }
	    if ( jQuery('html').attr('lang') == "fr" ) {
		jQuery('#awards-list').load("/fr/press/awards #mainfull");
		gotIt3 = true;
	    }
	    if ( jQuery('html').attr('lang') == "ja" ) {
		jQuery('#awards-list').load("/ja/press/awards #mainfull");
		jQuery('div.content').css('width','785px!important');
		gotIt3 = true;
	    }
	    if ( jQuery('html').attr('lang') == "en_EU" ) {
		jQuery('#awards-list').load("/eu/press/awards #mainfull");
		gotIt3 = true;
	    }
	    if ( jQuery('html').attr('lang') == "en_GB" ) {
		jQuery('#awards-list').load("/uk/press/awards #mainfull");
		gotIt3 = true;
	    }
	    if ( jQuery('html').attr('lang') == "en_AU" ) {
		jQuery('#awards-list').load("/au/press/awards #mainfull");
		gotIt3 = true;
	    }
	    if (gotIt3 === false) {
	    	jQuery('#awards-list').load("/press/awards #mainfull");
	    }
	}

	// load up resources
	if ( jQuery('#about').exists() && (document.URL.indexOf('press-resources') != -1) ) {
		var gotIt4 = false;
		if ( jQuery('html').attr('lang') == "de" ) {
			jQuery('#resources-list').load("/de/press/graphics #centerContent3Column");
			gotIt4 = true;
		}
		if ( jQuery('html').attr('lang') == "fr" ) {
			jQuery('#resources-list').load("/fr/press/graphics #centerContent3Column");
			gotIt4 = true;
		}
		if ( jQuery('html').attr('lang') == "ja" ) {
			jQuery('#resources-list').load("/ja/press/graphics #centerContent3Column");
			gotIt4 = true;
	  }
	  if ( jQuery('html').attr('lang') == "en_EU" ) {
			jQuery('#resources-list').load("/eu/press/graphics #centerContent3Column");
			gotIt4 = true;
	  }
	  if ( jQuery('html').attr('lang') == "en_GB" ) {
			jQuery('#resources-list').load("/uk/press/graphics #centerContent3Column");
			gotIt4 = true;
	  }
		if ( jQuery('html').attr('lang') == "en_AU" ) {
			jQuery('#resources-list').load("/au/press/graphics #centerContent3Column");
			gotIt4 = true;
	  }
	  if (gotIt4 === false) {
	    jQuery('#resources-list').load("/press/graphics #centerContent3Column");
	  }
	}
	
	// chat page blacklist
	//per alexBrunner 5-2013: remove the chat from the English, French and German support pages (UK, EU, DE, FR)
	if ( mindJet.localeCode == "us"     ||	/* US salesforce chat moved may-2013 to Tealium */
		 mindJet.localeCode == "ja"     ||	// no japanese chat anywhere
		 jQuery('.uk_support').exists() || 	// per alex brunner 5-2013
		 jQuery('.eu_support').exists() || 	// per alex brunner 5-2013
		 jQuery('.de_support').exists() ||	// per alex brunner 5-2013
		 jQuery('.fr_support').exists() || 	// per alex brunner 5-2013
		 (mindJet.localeCode == "fr" && !jQuery('.fr_shop').exists() ) 
		   ){
	     jQuery('.shop-chat-button-online').remove();
		 jQuery('.shop-chat-button-offline').remove();
    }

	//push to eloqua
	if (typeof elqGetCustomerGUID !== "undefined") {
		_elqQ.push(['elqGetCustomerGUID']);
	}

	/*
		/about/media-center/customers -- loads /case-studies into iframe
	*/
	if ( jQuery('body.case-studies').exists() && mindJet.lang =='fr') {
	  jQuery('iframe').css('height','1500px').css('background-color','#fff');
	}
	
	if ( jQuery('body.case-studies').exists() && mindJet.lang =='en' && !jQuery('body#mobile').exists() ) {
	  jQuery('iframe').css('height','11500px').css('background-color','#fff');
	}
	
	if ( jQuery('body.case-studies').exists() && mindJet.lang =='eu') {
	  jQuery('iframe').css('height','25000px').css('background-color','#fff');
	}
	
	if ( jQuery('body.case-studies').exists() ) {
		var iframeTest = mindJet.getUrlParam('iframe');
		if (iframeTest == 'yes') {
	
		  //tweaks to all /case-studies 
        jQuery('html').css('background-color','#fff!important');
        jQuery('body').css('background-color','#fff!important');
        jQuery('.navbar').remove();
        jQuery('footer').remove();
        jQuery('#project-management').css('margin-top','40px');
        jQuery('.margin-right').css('position','relative').css('left','-200px');

	    //tweaks per locale page
	    if (mindJet.lang =='en') {
        jQuery('div#mainfull').css('margin-top','-190px').css('padding','0');
        jQuery('#mainfull p').css('width','400px');
        jQuery('#h2').css('width','400px');
      }
      if (mindJet.lang =='eu' || mindJet.lang =='uk' || mindJet.lang == 'au' ) {
        jQuery('div#mainfull').css('margin-top','-190px');
        jQuery('#mainfull p').css('width','400px');
        jQuery('#wrapper960').css('width','400px');
        jQuery('.container_6 .grid_2').css('width','180px');
      }
	    if (mindJet.lang =='de') {

        jQuery('#container').css('width','540px');
        jQuery('body').css('padding-top','0').css('margin-top','-60px');        
        
      }
      if (mindJet.lang =='fr') {
        jQuery('div#mainfull').css('margin-top','-160px');
        jQuery( "a[href='#top']" ).remove();
        jQuery('h1').css('font-family','franklin-gothic-urw-comp');
                jQuery('#mainfull p').css('width','400px');
      }
      if (mindJet.lang =='ja') {
        jQuery('div#mainfull').css('margin-top','-155px').css('padding','0');
        jQuery('#mainfull p').css('width','400px');
        jQuery('.container_6 .grid_2').css('width','180px');
        jQuery('.trigger').css('margin-top','40px');
      }
		}
	}
	
	
	
	/*
		GREENZONE main nav 'Why Mindjet' Dropdown for non-greenzone pages
	*/
	// if NOT greenzone
	if (!jQuery('body.greenzone').exists() && !jQuery('body.signup-landing-page').exists() ) {
		// Main Nav dropdown
		var $dropdownNav1 = $('nav.main-nav li#firstmenu');

		$dropdownNav1.hover(function() {
			$(this).find('div.submenu').addClass('show');
		}, function() {
			$(this).find('div.submenu').removeClass('show');
		});
	}
	
	/*
		GREENZONE main nav 'Products' dropdown
	*/
	// all en pages
	if (jQuery('nav.main-nav li#secondmenu').exists() ) {
		// Products Nav dropdown
		var $dropdownNav2 = $('nav.main-nav li#secondmenu');

		$dropdownNav2.hover(function() {
			$(this).find('div.productsmenu').addClass('show');
		}, function() {
			$(this).find('div.productsmenu').removeClass('show');
		});
	}

	/*
		GREENZONE Google Search
	*/
	 
	// search in main Nav dropdown
	var $dropdownSearch = jQuery('#search-li');

	$dropdownSearch.hover(function() {
		jQuery(this).find('div.searchmenu').addClass('show');
		jQuery('#google-search').bind('keypress',  function(event) {
		  var query = jQuery(this).val();
		  if ( event.which === 13 && query.length > 1) {
			event.preventDefault();
			window.open('http://www.google.com/cse?cx=009867389364335090555%3Ai8a4ya2kra0&q=' + query);
		  }
		});
		jQuery('#google-search').focus();
	}, function() {
		jQuery(this).find('div.searchmenu').removeClass('show');
	});

	/* 
		GREENZONE homepage vimeos
	*/
	
	function vimeoIframe(videoLinkID) {
	  jQuery(videoLinkID).click(function(event){
		 event.preventDefault();
	  	 var vimeoURL = jQuery(videoLinkID).attr('href');
	  	 //add autoplay
	  	 if (vimeoURL.indexOf('autoplay') ==-1) {vimeoURL = vimeoURL + '?autoplay=1';}
	  	 var vIframe = '<iframe src="' + vimeoURL + '" width="940" height="526" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen seamless style="position:absolute;top:98px;left:0px;z-index:11;"></iframe>';
	  	 jQuery(videoLinkID).append(vIframe);
       });
	}
	if (jQuery('body.greenzone').exists()) {
		vimeoIframe('#sensorlink-video');
		vimeoIframe('#ziba-video');
		vimeoIframe('#ekso-video');
		vimeoIframe('#edc-video');
		vimeoIframe('#sharepoint-video');	
	} 
	// end homepage vimeos

	/* 
		GREENZONE community vimeo
	*/

	function vimeoCommunityIframe() {
    jQuery('#community-vimeo').click(function(event){
		  event.preventDefault();
		  var vimLink = jQuery('#community-vimeo').attr('href');
		if (vimLink.indexOf('autoplay') ==-1) {vimLink = vimLink + '?autoplay=1';}
	  	var communIframe = '<iframe src="' + vimLink + '" width="380" height="320" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen seamless style="position:absolute;top:0px;left:0px;z-index:11;"></iframe>';
	  	jQuery('#community-vimeo').append(communIframe);
	    });
  }
	if (jQuery('body.community-page.en.greenzone').exists()) {
		vimeoCommunityIframe();	
	}
    
    /* 
	  DL-LINKS
	  CURRENT VERSION DOWNLOAD URLS AT TOP OF SCRIPT
	*/	

	if ( jQuery('body.dl-links').exists() ) {
	
		jQuery("input[name=OS]").change(function() {
			var whatOS = jQuery('input[name=OS]:checked', '#download').val();
			if (whatOS == 'mac') {
			  jQuery('select#language').css('display','none');
			  jQuery('#release-notes-btn').css('visibility','hidden');
			  jQuery('#mac-language-message').css('display','block');
			} else {
			  jQuery('select#language').css('display','block');
			  jQuery('#release-notes-btn').css('visibility','visible');
			  jQuery('#mac-language-message').css('display','none');
			}
		});
		
		function downloadLinker() {
			var whatOS = jQuery('input[name=OS]:checked', '#download').val();
			var whatLang = jQuery('select#language').val()
			var target_download = mindJet.dl_win_en;
			
			if (whatOS == "windows" ) {
			  if (whatLang == "en") {target_download = mindJet.dl_win_en;}
			  if (whatLang == "de") {target_download = mindJet.dl_win_de;}
			  if (whatLang == "fr") {target_download = mindJet.dl_win_fr;}
			  if (whatLang == "ja") {target_download = mindJet.dl_win_ja;}
			}
			if (whatOS == "mac" )  {target_download = mindJet.dl_mac;}
			return target_download;
		}
		
		function notesLinker() {
			var whatOS = jQuery('input[name=OS]:checked', '#download').val();
			var whatLang = jQuery('select#language').val()
			var target_releaseNotes = mindJet.dl_win_en;
			
			if (whatOS == "windows" ) {
			  if (whatLang == "en") {target_releaseNotes = mindJet.rn_win_en;}
			  if (whatLang == "de") {target_releaseNotes = mindJet.rn_win_de;}
			  if (whatLang == "fr") {target_releaseNotes = mindJet.rn_win_fr;}
			  if (whatLang == "ja") {target_releaseNotes = mindJet.rn_win_ja;}
			}
			if (whatOS == "mac" )  {target_releaseNotes = mindJet.rn_mac;}
			return target_releaseNotes;
		}
		
		//download button
		jQuery("#download-btn").hover(function() {		
			var setLink = downloadLinker();
			jQuery("#download-btn").attr('href', setLink);	
		});
		jQuery("#download-btn").click(function() {		
			var goToUrl = downloadLinker();
			window.location = goToUrl;  // this does the download	
		});
		
		// release notes link
		jQuery("#release-notes-btn").hover(function() {		
			var setLink = notesLinker();
			jQuery("#release-notes-btn").attr('href', setLink);	
		});
	
		jQuery("#release-notes-btn").click(function() {		
			var goToUrl = notesLinker();
			window.location = goToUrl;  // this does the download	
		});
		
	
	} // end dl-links

	/* 
	  customizations to /products/mindmanager (all languages)
	  - sticky div when scrolled to
	  - social sharing buttons
	*/
	
	if ( jQuery('#product-mindmanager').exists() ) {

		// sticky div
		function sticky_relocate() {
		  var window_top = jQuery(window).scrollTop();
		  var div_top = jQuery('#sticky-anchor').offset().top;
		  if (window_top > div_top) {
			jQuery('#sticky').addClass('stick');
		  } else {
			jQuery('#sticky').removeClass('stick');
		  }
		}
		jQuery(function() {
		  jQuery(window).scroll(sticky_relocate);
		  sticky_relocate();
		});
		
		// social buttons - http://plugins.in1.com/share/
		// (us-only)
		if (mindJet.lang == 'en'){
			jQuery('body').prepend('<div id="socialtab"></div>');

			jQuery.getScript("/js/jquery-share/jquery.share.js")
			.done(function(script, textStatus) {
				jQuery('#socialtab').share({
					networks: ['facebook','twitter','googleplus','linkedin','pinterest','email'],
					theme: 'square'
				});
			})
			.fail(function(jqxhr, settings, exception) {
				console.log(jqxhr); 
				console.log(settings); 
				console.log(exception); 
			});
		}
	 } 	// end customizations to /products/mindmanager 
	 
	 jQuery('header.greenzone').css('display','block');

});
