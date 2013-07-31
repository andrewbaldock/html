/*_____________________________________________________________________________
 _                   _                     _                                   
| |                 | |                   | |                            o     
| |  __   __   __,  | |  _     _   _  _   | |  __   ,_    __   _   ,_       ,  
|/  /  \_/    /  |  |/  |/----|/  / |/ |  |/  /  \_/  |  /    |/  /  |   | / \_
|__/\__/ \___/\_/|_/|__/|__/  |__/  |  |_/|__/\__/    |_/\___/|__/   |_/o|/ \/ 
                                          |\                            /|     
                                          |/                            \|   
                                          '                              ' 
 | When the flag dropdown is used, Apache drops a 'locale' cookie.           
 | This script looks for that cookie and enforces that locale, if possible: 
 | includes an ajax test to look ahead and make sure the target page exists.
 | does not need jquery.

   ~andrew baldock 6-2013 
_____________________________________________________________________________*/

/* 
  ON-OFF SWTICH 
*/
var locale_enforcer_ACTIVE = true;

/*
   UTILITIES
*/
// actual redirect happens here
function redirect(where) { 
  if (locale_enforcer_ACTIVE == true) {
    window.location = where;
  }
}
// ajax util 1
function returnStatus(req, status, url) {
  //console.log(req);
  if(status == 200) {
    console.log("The url is available");
    redirect(url);  
  }
  else {
    console.log("The url returned status code " + status);
    // send a different event
  }
}
// ajax util 2
function fetchStatus(address) {
 var client = new XMLHttpRequest();
 client.onreadystatechange = function() {
  // in case of network errors this might not give reliable results
  if(this.readyState == 4)
   returnStatus(this, this.status, address);
 }
 client.open("HEAD", address);
 client.send();
}

/*
   THE LOCALE ENFORCER.
*/
function localeByCookie() {

  var allpaths = ['/au/', '/eu/', '/de/', '/fr/', '/ja/', '/uk/'];

  //blacklist -- don't fire on these pages
  if(document.URL.indexOf("trial") >= 0 || document.URL.indexOf("start") >= 0) {return;}

  /*
     Cookie utility
  */
  function readCookie(e){var t=e+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return null}

  var logging = true;
  if(document.URL.indexOf("www.mindjet.com") >= 0) { logging = false; } //don't log in production

  var cookie_locale   = readCookie('locale');
  if(cookie_locale == null) {return;}   //if no cookie then exit
  var cookie_path = '/' + cookie_locale + '/';

  var page_url = window.location.pathname;
  var page_path = page_url.slice(0, 4); //get first 4 characters of url path

  //see if we are on a locale page
  var is_loc_page = false;
  for (i = 0; i < allpaths.length && !is_loc_page; i++) {
    if (allpaths[i] === page_path) {
      is_loc_page = true; // on a locale page
    }
  }
  if(is_loc_page != true) { page_path = '/';} // on an english page

  // log
  if(typeof console != 'undefined' && logging == true) {
    console.log('cookie_path: ' + cookie_path + ' | page_path: ' + page_path + ' | is_loc_page=' + is_loc_page );
  }

  //prepare to jump!
  if(cookie_path != page_path && document.URL.indexOf(cookie_path) == -1){ 
    if (cookie_path == '/en/') {cookie_path = '/';}
    if (is_loc_page == true) {
      var url_build = cookie_path + page_url.substr(4);  //substr(4) = get everything after the 4th char
    } else {
      var url_build = cookie_path + page_url.substr(1);  //is en, just drop the first slash
    }
    // NEW URL IS HERE
    new_page_url = window.location.protocol + '//' + window.location.host + url_build + window.location.search;
    current_page_url = document.URL;
    if(new_page_url == current_page_url){return;}
    // log
    if(typeof console != 'undefined' && logging == true) { 
      console.log('locale-cookie says go to ' + new_page_url);
    }

    // ajax test to see if new_page_url exists
    fetchStatus(new_page_url);
  } 


}
// asynchronous
// window.onload = localeByCookie();

// not asynchronous
localeByCookie();

