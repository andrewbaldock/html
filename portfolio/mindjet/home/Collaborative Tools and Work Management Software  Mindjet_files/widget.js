Prefinery={feedback:function(e){this.konfig=e?e:{};this.konfig.link_id=this.konfig.link_id?this.konfig.link_id:"prefinery_feedback_link";this.konfig.force_reload=this.konfig.force_reload?this.konfig.force_reload:false;this.konfig.preview=this.konfig.preview?this.konfig.preview:false;this.konfig.host=this.konfig.host?this.konfig.host:"prefinery.com";protocol=this.konfig.ssl==false?"http://":"https://";url=protocol+this.konfig.account+"."+this.konfig.host+"/betas/"+this.konfig.beta_id+"/comments/new?display=popup";if(this.konfig.preview){url=url+"&preview=true"}Prefinery.draw_overlay();if(this.konfig.show_tab){var t=document.createElement("div");t.innerHTML='<div id="prefinery_feedback_tab"><a href="#" id="prefinery_feedback_tab_link">Feedback</a></div>';document.body.appendChild(t)}if(this.getId(this.konfig.link_id)){Prefinery.bind_widget_to_eid(url,this.konfig.link_id,this.konfig.force_reload)}if(this.konfig.link_class){Prefinery.bind_widget_to_class(url,this.konfig.link_class,this.konfig.force_reload)}if(this.konfig.show_tab){Prefinery.bind_widget_to_eid(url,"prefinery_feedback_tab_link",this.konfig.force_reload)}},invite:function(e,t){this.konfig=t?t:{};this.konfig.link_id=this.konfig.link_id?this.konfig.link_id:"prefinery_invite_link";Prefinery.draw_overlay();if(this.getId(this.konfig.link_id)){Prefinery.bind_widget_to_eid(e,this.konfig.link_id)}},apply:function(e){this.konfig=e?e:{};this.konfig.link_id=this.konfig.link_id?this.konfig.link_id:"prefinery_apply_link";this.konfig.force_reload=this.konfig.force_reload?this.konfig.force_reload:false;this.konfig.preview=this.konfig.preview?this.konfig.preview:false;this.konfig.host=this.konfig.host?this.konfig.host:"prefinery.com";protocol=this.konfig.ssl==false?"http://":"https://";url=protocol+this.konfig.account+"."+this.konfig.host+"/betas/"+this.konfig.beta_id+"/testers/new?display=popup";if(this.konfig.preview){url=url+"&preview=true"}Prefinery.draw_overlay();if(this.getId(this.konfig.link_id)){Prefinery.bind_widget_to_eid(url,this.konfig.link_id,this.konfig.force_reload)}if(this.konfig.link_class){Prefinery.bind_widget_to_class(url,this.konfig.link_class,this.konfig.force_reload)}},invite_a_friend:function(e){this.konfig=e?e:{};this.konfig.link_id=this.konfig.link_id?this.konfig.link_id:"prefinery_invite_a_friend_link";this.konfig.force_reload=this.konfig.force_reload?this.konfig.force_reload:false;this.konfig.host=this.konfig.host?this.konfig.host:"prefinery.com";protocol=this.konfig.ssl==false?"http://":"https://";url=protocol+this.konfig.account+"."+this.konfig.host+"/betas/"+this.konfig.beta_id+"/friend_invitations/new?display=popup";if(this.konfig.tester_hash){url=url+"&tester_hash="+this.konfig.tester_hash}Prefinery.draw_overlay();if(this.konfig.show_tab){var t=document.createElement("div");t.innerHTML='<div id="prefinery_invite_a_friend_tab"><a href="#" id="prefinery_invite_a_friend_tab_link">Invite a Friend</a></div>';document.body.appendChild(t)}if(this.getId(this.konfig.link_id)){Prefinery.bind_widget_to_eid(url,this.konfig.link_id,this.konfig.force_reload)}if(this.konfig.show_tab){Prefinery.bind_widget_to_eid(url,"prefinery_invite_a_friend_tab_link",this.konfig.force_reload)}},bind_widget_to_eid:function(e,t,n){this.getId(t).onclick=function(){Prefinery.show(e,n);return false};this.getId("prefinery_close").onclick=function(){Prefinery.hide();return false};this.getId("prefinery_iframe").setAttribute("src","")},bind_widget_to_class:function(e,t,n){var r=this.getClass(document,t),i=r.length;for(var s=0;s<i;s++){var o=r[s];o.onclick=function(){Prefinery.show(e,n);return false}}this.getId("prefinery_close").onclick=function(){Prefinery.hide();return false};this.getId("prefinery_iframe").setAttribute("src","")},set_position:function(){this.scroll_top=document.documentElement.scrollTop||document.body.scrollTop;this.scroll_height=document.documentElement.scrollHeight;this.client_height=window.innerHeight||document.documentElement.clientHeight;this.getId("prefinery_screen").style.height=screen.height+this.client_height+"px";this.getId("prefinery_container").style.top=this.scroll_top+this.client_height*.1+"px"},draw_overlay:function(){if(!this.getId("prefinery_overlay")){this.overlay_html='<div id="prefinery_overlay" style="display:none">'+'<div id="prefinery_container">'+'<a href="#" id="prefinery_close"></a>'+'<iframe src="" id="prefinery_iframe" allowTransparency="true" scrolling="no" frameborder="0"></iframe>'+"</div>"+'<div id="prefinery_screen"></div>'+"</div>";document.write(this.overlay_html)}},show:function(e,t){if(this.getId("prefinery_iframe").getAttribute("src")==""||this.getId("prefinery_iframe").getAttribute("src")!=e||t){this.getId("prefinery_iframe").setAttribute("src",e);if(this.getId("prefinery_iframe").addEventListener){this.getId("prefinery_iframe").addEventListener("load",Prefinery.loaded,false)}else if(this.getId("prefinery_iframe").attachEvent){this.getId("prefinery_iframe").detachEvent("onload",Prefinery.loaded);this.getId("prefinery_iframe").attachEvent("onload",Prefinery.loaded)}}this.set_position();this.getId("prefinery_overlay").style.display="block"},hide:function(){this.getId("prefinery_overlay").style.display="none"},loaded:function(){Prefinery.getId("prefinery_iframe").className="loaded"},getId:function(e){return document.getElementById(e)},getClass:function(e,t){if(e.getElementsByClassName){return e.getElementsByClassName(t)}else{return function(t,n){if(n==null)n=document;var r=[],i=n.getElementsByTagName("*"),s=i.length,o=new RegExp("(^|\\s)"+t+"(\\s|$)"),u,a;for(u=0,a=0;u<s;u++){if(o.test(i[u].className)){r[a]=i[u];a++}}return r}(t,e)}}};var styles="#prefinery_overlay { width: 100%; height: 100%; top: 0; left: 0; z-index: 9999; position: absolute;}";styles+="#prefinery_screen { top: 0; left: 0; z-index: 1; width: 100%; position: absolute; background-color: #000; opacity: 0.50; -moz-opacity: 0.50; filter: alpha(opacity=50);}";styles+="#prefinery_container { height: 1200px; margin: 0 auto; position: relative; width: 570px; z-index: 2;}";styles+="#prefinery_container iframe { width: 558px; height: 100%; margin: 20px; background: transparent url('https://c468782.ssl.cf0.rackcdn.com/loading.png') no-repeat; background-position: top right;}";styles+="#prefinery_container iframe.loaded { background: transparent none repeat scroll 0 0;}";styles+="a#prefinery_close { position: absolute; cursor: pointer; outline: none; top: -12px; right: 0; z-index: 5; width: 48px; height: 48px; overflow: hidden; background: transparent url('https://c468782.ssl.cf0.rackcdn.com/close.png') no-repeat scroll 0 0;}";styles+="#prefinery_invite_a_friend_tab { position: absolute; top: 180px; right: 0px; width: 27px; height: 131px; border-top: 2px solid #FFF; border-left: 2px solid #FFF; border-bottom: 2px solid #FFF;}";styles+="#prefinery_invite_a_friend_tab_link { display: block; width: 100%; height: 100%; text-decoration: none; border: none; text-indent: -9999px; background: #006699 url('https://c468782.ssl.cf0.rackcdn.com/invite-a-friend-text.png') no-repeat scroll 0 0;}";styles+="#prefinery_feedback_tab { position: absolute; top: 180px; right: 0px; width: 27px; height: 131px; border-top: 2px solid #FFF; border-left: 2px solid #FFF; border-bottom: 2px solid #FFF;}";styles+="#prefinery_feedback_tab_link { display: block; width: 100%; height: 100%; text-decoration: none; border: none; text-indent: -9999px; background: #006699 url('https://c468782.ssl.cf0.rackcdn.com/feedback-text.png') no-repeat scroll 0 0;}";var style=document.createElement("style");style.setAttribute("type","text/css");style.setAttribute("charset","utf-8");try{style.appendChild(document.createTextNode(styles));document.getElementsByTagName("head").item(0).appendChild(style)}catch(e){}if(document.createStyleSheet){document.createStyleSheet("https://www.prefinery.com/stylesheets/widget.css")}