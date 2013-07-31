//tealium universal tag - utag.12 ut4.0.201302150430, Copyright 2013 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1,'link':1};u.base_url="//c.lytics.io/static/io.min.js";u.initialized=false;u.map={"dom.domain":"url"};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){u.data={};var c,d,e,f;for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
window.jstagAsyncInit=function(){u.initialized=true;jstag.init({cid:"1263",url:"//c.lytics.io"});jstag.send(u.data);}
if(!u.initialized){u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}else{jstag.send(u.data);}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('12','mjet.main');}catch(e){}
