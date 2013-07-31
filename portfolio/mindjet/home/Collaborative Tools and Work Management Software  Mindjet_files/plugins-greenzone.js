// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/* 
 * zRSSFeed  
 * www.zazar.net/developers/jquery/zrssfeed/ 
 *  
 */
(function(l){l.fn.rssfeed=function(d,h,v){h=l.extend({limit:10,offset:1,header:!0,titletag:"h4",date:!0,dateformat:"datetime",content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,ssl:!1,linktarget:"_self",linkredirect:"",linkcontent:!1,sort:"",sortasc:!0,historical:!1},h);return this.each(function(x,p){var t=l(p),f="";h.ssl&&(f="s");t.hasClass("rssFeed")||t.addClass("rssFeed");if(null==d)return!1;0<h.offset&&(h.offset-=1);h.limit+=h.offset;f="http"+f+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+
encodeURIComponent(d);f+="&num="+h.limit;h.historical&&(f+="&scoring=h");null!=h.key&&(f+="&key="+h.key);l.getJSON(f+"&output=json_xml",function(j){if(200==j.responseStatus){var f=j.responseData,e=h;if(j=f.feed){var i=[],c=0,d="",u="odd";if(e.media){var m=f.xmlString;"Microsoft Internet Explorer"==navigator.appName?(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(m)):c=(new DOMParser).parseFromString(m,"text/xml");m=c.getElementsByTagName("item")}e.header&&(d+='<div class="rssHeader"><a href="'+
j.link+'" title="'+j.description+'">'+j.title+"</a></div>");d+='<div class="rssBody"><ul>';for(f=e.offset;f<j.entries.length;f++){c=f-e.offset;i[c]=[];var g=j.entries[f],a,b="",k=g.link;switch(e.sort){case "title":b=g.title;break;case "date":b=g.publishedDate}i[c].sort=b;if(g.publishedDate)switch(b=new Date(g.publishedDate),a=b.toLocaleDateString()+" "+b.toLocaleTimeString(),e.dateformat){case "datetime":break;case "date":a=b.toLocaleDateString();break;case "time":a=b.toLocaleTimeString();break;case "timeline":a=
new Date(b);a=Math.round(((new Date).getTime()-a.getTime())/1E3);60>a?a="< 1 min":(3600>a?(a=Math.round(a/60)-1,b="min"):86400>a?(a=Math.round(a/3600)-1,b="hour"):604800>a?(a=Math.round(a/86400)-1,b="day"):(a=Math.round(a/604800)-1,b="week"),1<a&&(b+="s"),a=a+" "+b);break;default:a=b,b=new Date(a),a=e.dateformat,a=a.replace("dd",n(b.getDate())),a=a.replace("MM",n(b.getMonth()+1)),a=a.replace("yyyy",b.getFullYear()),a=a.replace("hh",n(b.getHours())),a=a.replace("mm",n(b.getMinutes())),a=a.replace("ss",
n(b.getSeconds()))}e.linkredirect&&(k=encodeURIComponent(k));i[c].html="<"+e.titletag+'><a href="'+e.linkredirect+k+'" title="View this feed at '+j.title+'">'+g.title+"</a></"+e.titletag+">";e.date&&a&&(i[c].html+="<div>"+a+"</div>");e.content&&(g=e.snippet&&""!=g.contentSnippet?g.contentSnippet:g.content,e.linkcontent&&(g='<a href="'+e.linkredirect+k+'" title="View this feed at '+j.title+'">'+g+"</a>"),i[c].html+="<p>"+g+"</p>");if(e.media&&0<m.length&&(k=m[f].getElementsByTagName("enclosure"),0<
k.length)){i[c].html+='<div class="rssMedia"><div>Media files</div><ul>';for(g=0;g<k.length;g++){var q=k[g].getAttribute("url"),r=k[g].getAttribute("type"),s=k[g].getAttribute("length"),b=i[c],w=i[c].html,q='<li><a href="'+q+'" title="Download this media">'+q.split("/").pop()+"</a> ("+r+", ",r=Math.floor(Math.log(s)/Math.log(1024)),s=(s/Math.pow(1024,Math.floor(r))).toFixed(2)+" "+"bytes kb MB GB TB PB".split(" ")[r];b.html=w+(q+s+")</li>")}i[c].html+="</ul></div>"}}e.sort&&i.sort(function(a,b){if(e.sortasc)var c=
a.sort,d=b.sort;else c=b.sort,d=a.sort;if("date"==e.sort)return new Date(c)-new Date(d);c=c.toLowerCase();d=d.toLowerCase();return c<d?-1:c>d?1:0});l.each(i,function(a){d+='<li class="rssRow '+u+'">'+i[a].html+"</li>";u="odd"==u?"even":"odd"});d+="</ul></div>";l(p).html(d);l("a",p).attr("target",e.linktarget)}l.isFunction(v)&&v.call(this,t)}else h.showerror&&(c=""!=h.errormsg?h.errormsg:j.responseDetails),l(p).html('<div class="rssError"><p>'+c+"</p></div>")})})};var n=function(d){d+="";2>d.length&&
(d="0"+d);return d}})(jQuery); 
// end zRSSFeed 

/*
 * version: 3.0.0
 * package: OrangeBox
 * author: David Paul Hamilton - http://davidpaulhamilton.net/orangebox
 * copyright: Copyright (c) 2012 David Hamilton / DavidPaulHamilton.net All rights reserved.
 * license: GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

if(typeof oB!=='undefined'){console.log('OrangeBox: Variable "oB", used by OrangeBox, is already defined');}else{var oB;(function($){oB={gallery:[],settings:{autoplay:false,searchTerm:'lightbox',fadeControls:false,keyboardNavigation:true,orangeControls:false,showClose:true,showDots:false,showNav:true,addThis:false,addThisServices:'twitter,facebook,digg,delicious,more',notFound:'Not Found',overlayOpacity:0.95,contentBorderWidth:4,contentRoundedBorder:true,contentMinSize:[100,200],contentMaxSize:[0.75,0.75],videoAspect:[390,640],fadeTime:200,slideshowTimer:3000,streamItems:10,logging:false,checkAlias:true},methods:{init:function(o){function checkURL(searchTerm){if(oB.ourl.match(/#\..{1,}\.facebook/)){oB.ourl=oB.ourl.substr(0,oB.ourl.search(/#\..{1,}\.facebook/));}
    if(oB.ourl.match(/^#\w{1,}$/)&&$('#'+oB.ourl).length>0){oB.methods.create($('#'+oB.ourl));}else{$(searchTerm).each(function(){var href=$(this).attr('href');href=href.replace(/\//gi,'').replace(/\./gi,'').replace(/:/gi,'').replace(/\?/gi,'').replace(/&/gi,'').replace(/\=/gi,'').replace(/#/gi,'');if(href.indexOf(oB.ourl)!==-1){oB.methods.create($(this));return false;}});}}
    if(!$('#ob_content').length){if(o){$.extend(oB.settings,o);}
        var searchTerm='a[data-ob*=lightbox], area[data-ob*=lightbox], a[rel*=lightbox], area[rel*=lightbox]';if(oB.settings.searchTerm!==""){searchTerm='a[data-ob*='+oB.settings.searchTerm+'], area[data-ob*='+oB.settings.searchTerm+'], a[rel*='+oB.settings.searchTerm+'], area[rel*='+oB.settings.searchTerm+']';}
        oB.windowURL=window.location.href;if(oB.windowURL.match(/(&|\?)orangebox=/)){oB.windowURL=oB.windowURL.substr(0,oB.windowURL.search(/(&|\?)orangebox=/));}
        oB.ourl=oB.methods.getUrlVars()['orangebox'];try{document.createEvent("TouchEvent");oB.touch=true;oB.methods.logit('Touch device detected',true);}catch(e){oB.touch=false;oB.methods.logit('Touch device not detected',true);}
        if(oB.settings.orangeControls===true&&!$().orangeControls){oB.methods.logit('Connection with OrangeControls failed');oB.settings.orangeControls=false;}
        oB.browser=$.browser;if(oB.settings.addThis){$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4dd42f2b5b9fc332',function(){if(oB.ourl){checkURL(searchTerm);}});}else if(oB.ourl){checkURL(searchTerm);}
        return this.each(function(){oB.methods.setupData($(this));});}
    return false;},setupData:function(o){var u=o.attr('href'),c=false,s=[0,0],i=0,t="",g=false,rel=o.attr('data-ob'),id,alias=false,unique=true,cap=o.attr('data-ob_caption');if(!rel||rel===""){rel=o.attr('rel');o.attr('data-ob',rel);}
    if(rel&&rel.match(/\[/)){g=rel.substring(rel.indexOf("[")+1,rel.indexOf("]")).replace(/ /g,"_");$.each(oB.gallery,function(){if(this.name===g){unique=false;if(oB.settings.checkAlias){$.each(this.objects,function(){if(this.data('oB')&&this.data('oB').href===o.attr('href')){oB.methods.logit('Object already added: '+u,true);alias=this;}});}}});if(unique){oB.gallery.push({name:g,objects:[]});}}
    if(oB.settings.checkAlias&&(o.data('oB')||alias)){oB.methods.logit('Object already added: '+u,true);o.click(function(e){e.preventDefault();oB.methods.create(alias);});}else if(u){if(typeof o.attr('title')!=="undefined"){t=o.attr('title');}
        if(typeof o.attr('data-ob_height')!=='undefined'){s[0]=parseInt(o.attr('data-ob_height'),10);}
        if(typeof o.attr('data-ob_width')!=='undefined'){s[1]=parseInt(o.attr('data-ob_width'),10);}
        if(typeof o.attr('data-ob_iframe')!=='undefined'&&o.attr('data-ob_iframe')==="true"){c="iframe";}else if(u.match(/\.(?:jpg|jpeg|bmp|png|gif)/i)){c="image";}else if(u.match(/\.pdf/i)){c="pdf";}else if(u.match(/\.swf/i)){c="flash";}else if(u.match(/^http:\/\/api\.flickr\.com\/services\/feeds\/.{1,}\.gne\?id=\d{1,}@.{1,}&lang=.{1,}&format=rss_200/i)){c="flickr";u=u.replace('rss_200','json')+"&jsoncallback=?";if(!rel.match(/\[/)){g='flickr'+newDate.getTime();}
            $.getJSON(u,function(data){$.each(data.items,function(index,item){var item_href=item.media.m.replace('_m.jpg','.jpg'),delay="";if(typeof o.attr('data-ob_delayTimer')!=="undefined"&&o.attr('data-ob_delayTimer')!=="0"){delay='data-ob_delayTimer="'+o.attr('data-ob_delayTimer')+'"';}
                if(index===0){o.attr({href:item_href,"data-ob_share":"false",caption:cap,title:item.title});oB.methods.setupData(o);}else if(index<oB.settings.streamItems){oB.methods.setupData($('<a href="'+item_href+'" data-ob_linkText="'+o.attr('data-ob_linkText')+'" data-ob_link="'+o.attr('data-ob_link')+'" data-ob_linkTarget="'+o.attr('data-ob_linkTarget')+'" '+delay+' data-ob_share="false" title="'+item.title+'" data-ob="lightbox['+g+']"></a>'));}else{return false;}});});}else if(u.match(/^https:\/\/picasaweb\.google\.com\/data\/feed\/base\//i)){c="picasa";u=u.replace('/base/','/api/').replace('alt=rss','alt=json-in-script')+'&max-results='+oB.settings.streamItems+'&callback=?';if(!rel.match(/\[/)){g='picasa'+newDate.getTime();}
            $.ajax({url:u,dataType:'json',success:function(data){$.each(data.feed.entry,function(index,item){var picasaSrc,delay="";if(typeof o.attr('data-ob_delayTimer')!=="undefined"&&o.attr('data-ob_delayTimer')!=="0"){delay='data-ob_delayTimer="'+o.attr('data-ob_delayTimer')+'"';}
                if(item.content){picasaSrc=item.content.src;}else if(item.media$group.media$content[0]){picasaSrc=item.media$group.media$content[0].url;}else{return false;}
                if(cap===""){cap=item.summary.$t;}
                if(index===0){o.attr({href:picasaSrc,"data-ob_share":"false","data-ob_caption":cap,title:item.title.$t});oB.methods.setupData(o);}else if(index<oB.settings.streamItems){oB.methods.setupData($('<a href="'+picasaSrc+'" data-ob_caption="'+item.summary.$t+'" data-ob_linkText="'+o.attr('data-ob_linkText')+'" data-ob_link="'+o.attr('data-ob_link')+'" data-ob_linkTarget="'+o.attr('data-ob_linkTarget')+'" '+delay+' data-ob_share="false" title="'+item.title.$t+'" data-ob="lightbox['+g+']"></a>'));}else{return false;}});}});}else if(u.match(/^http:\/\/\w{0,3}\.?youtube\.\w{2,3}\/watch\?v=[\w\-]{11}/i)){id=u.match(/\?v=[\w\-]{11}/)[0].substring(3);c="youtube";}else if(u.match(/^http:\/\/\w{0,3}\.?youtu\.be\/[\w\-]{11}$/i)){id=u.match(/youtu\.be\/[\w\-]{11}$/)[0].substring(9);c="youtube";}else if(u.match(/^http:\/\/\w{0,3}\.?youtube\.\w{2,3}\/embed\/[\w\-]{11}$/i)){id=u.match(/\/embed\/[\w\-]{11}$/)[0].substring(7);c="youtube";}else if(u.match(/^http:\/\/\w{0,3}\.?vimeo\.com\/\d{1,10}$/i)){id=u.match(/vimeo\.com\/\d{1,}/)[0].substring(10);c="vimeo";}else if(u.match(/^http:\/\/\w{0,3}\.?viddler\.com\/(?:simple|player)\/\w{1,10}$/i)){id=u.match(/viddler\.com\/(player|simple)\/\w{1,}/)[0].substring(19);c="viddler";}else if(u.match(/^#\w{1,}$/i)){c="inline";}else{oB.methods.logit('Unsupported Media: '+u);}
        if(c&&c!=="flickr"&&c!=="picasa"){$.each(oB.gallery,function(){if(this.name===g){i=this.objects.push(o)-1;}});o.data('oB',{size:s,css:'',gallery:g,index:i,contentType:c,href:u,title:t,linkText:o.attr('data-ob_linkText'),"link":o.attr('data-ob_link'),linkTarget:o.attr('data-ob_linkTarget'),caption:cap,share:o.attr('data-ob_share'),delayTimer:o.attr('data-ob_delayTimer'),id:id}).click(function(e){e.preventDefault();oB.methods.create(o);});}}else{oB.methods.logit('Object has no "href" attribute');}},create:function(obj,o){function handleEscape(e){if(e.keyCode===27&&oB.progress===null){oB.methods.destroy();}else if(e.keyCode===37&&oB.progress===null){oB.methods.slideshowPause();oB.methods.navigate(-1);}else if(e.keyCode===39&&oB.progress===null){oB.methods.slideshowPause();oB.methods.navigate(1);}}
    if(!$('#ob_content').length){if(o){$.extend(oB.settings,o);}
        if(!obj){obj=(this instanceof jQuery)?this:$(this);}
        if(!obj.data('oB')){oB.methods.setupData(obj);}
        if(obj.data('oB').contentType){oB.currentGallery=[];oB.playing=oB.settings.autoplay;oB.progress=null;oB.docHeight=$(document).height();oB.docWidth=$(document).width();$.each(oB.gallery,function(){if(this.name===obj.data('oB').gallery){oB.currentGallery=this.objects;return false;}});var overlay=$('<div id="ob_overlay"></div>').css({"opacity":oB.settings.overlayOpacity,"height":oB.docHeight,"min-height":oB.docHeight,"min-width":oB.docWidth}),container=$('<div id="ob_container"></div>'),ob_content=$('<div id="ob_content"></div>').click(function(e){e.stopPropagation();}).css("border-width",oB.settings.contentBorderWidth);if(oB.settings.contentRoundedBorder){ob_content.css({"-moz-border-radius":oB.settings.contentBorderWidth,"border-radius":oB.settings.contentBorderWidth});}
            if(oB.touch){container.css("min-width",oB.docWidth);}
            if(oB.settings.addThis===true&&typeof addthis==='undefined'){oB.methods.logit('Connection with addThis failed');oB.settings.addThis=false;}
            if(typeof document.body.style.maxHeight==="undefined"){$("body","html").css({height:"100%",width:"100%"});}
            $("body").append(overlay.fadeIn(oB.settings.fadeTime).click(function(){oB.methods.destroy();})).append(container.click(function(){oB.methods.destroy();}));$("#ob_container").append('<div id="ob_float"></div>').append(ob_content);if(oB.settings.keyboardNavigation){$(document).keydown(handleEscape);}
            oB.methods.showContent(obj,true);}}},showContent:function(obj,initial){var href=obj.data('oB').href,title=obj.data('oB').title,contentType=obj.data('oB').contentType,content,ob_caption='',ob_caption_text='',tag=href,navRight=$('<a class="ob_nav" id="ob_right"><span class="ob_controls" id="ob_right-ico"></span></a>').click(function(e){if(oB.progress===null){oB.methods.slideshowPause();e.stopPropagation();oB.methods.navigate(1);}}),navLeft=$('<a class="ob_nav" id="ob_left"><span class="ob_controls" id="ob_left-ico"></span></a>').click(function(e){if(oB.progress===null){oB.methods.slideshowPause();e.stopPropagation();oB.methods.navigate(-1);}}),dotnav=$('<ul id="ob_dots"></ul>').click(function(e){e.stopPropagation();}),ob_link;if(obj.data('oB').caption){ob_caption_text=$.trim(obj.data('oB').caption);if(ob_caption_text!==""){ob_caption=$('<div id="ob_caption"></div>').click(function(e){e.stopPropagation();}).append('<p>'+ob_caption_text+'</p>');}}
    tag=tag.replace(/\//gi,'').replace(/\./gi,'').replace(/:/gi,'').replace(/\?/gi,'').replace(/&/gi,'').replace(/\=/gi,'').replace(/#/gi,'');ob_link=(oB.windowURL.match(/\?/))?oB.windowURL+"&orangebox="+tag:oB.windowURL+"?orangebox="+tag;oB.currentIndex=obj.data('oB').index;oB.methods.showLoad();$('#ob_content').removeClass().addClass('content'+oB.currentIndex);if(oB.settings.showDots){$.each(oB.currentGallery,function(x){dotnav.append($('<li id="ob_dot'+x+'"></li>').click(function(e){e.stopPropagation();if(!$(this).hasClass('current')&&oB.progress===null){oB.methods.slideshowPause();var x=$(this).attr('id').substr(6);dotnav.find("li").removeClass('current');$(this).addClass('current');oB.methods.navigate("",x);}}));});}
    if(oB.currentGallery.length>1){if(oB.settings.orangeControls){$(document).orangeControls();}
        if(oB.settings.showDots){$('#ob_content').append(dotnav);}}
    if(oB.settings.showClose){$('#ob_content').append($('<div title="close" class="ob_controls ob_cs" id="ob_close"></div>').click(function(e){e.stopPropagation();oB.methods.destroy();}));}
    function setControls(){if(oB.settings.showDots){$('#ob_dots').find('li').each(function(){var i='ob_dot'+obj.data('oB').index;if($(this).attr('id')===i){$(this).addClass('current');}else{$(this).removeClass('current');}});}
        if(oB.settings.showNav){if(oB.currentGallery[oB.currentIndex+1]){$('#ob_content').append(navRight);}
            if(oB.currentGallery[oB.currentIndex-1]){$('#ob_content').append(navLeft);}}
        clearTimeout(oB.controlTimer);if(oB.settings.fadeControls&&!oB.touch){if(!oB.playing||initial){$('.ob_controls').fadeIn(oB.settings.fadeTime);}
        else{$('.ob_controls').hide();}
            oB.controlTimer=setTimeout(function(){$('.ob_controls').fadeOut(oB.settings.fadeTime);},1200);$(document).mousemove(function(event){$('.ob_controls').fadeIn(oB.settings.fadeTime);clearTimeout(oB.controlTimer);oB.controlTimer=setTimeout(function(){if(!$(event.target).hasClass('ob_controls')&&!$(event.target).parent().hasClass('ob_controls')){oB.controlTimer=setTimeout(function(){$('.ob_controls').fadeOut(oB.settings.fadeTime);},1200);}},20);});}else{$('.ob_controls').fadeIn(oB.settings.fadeTime);}}
    function setWindowMargin(w){var copied_elem=$('<div>'+title+'</div>').css({visibility:"hidden",display:"block",position:"absolute",width:w-40,"line-height":$('#ob_title').css('line-height'),"font-size":$('#ob_title').css('font-size')});$("body").append(copied_elem);$('#ob_content').css('margin-top',copied_elem.height()+44);$('#ob_title').css({'margin-top':-copied_elem.height()-oB.settings.contentBorderWidth-4,'margin-right':-oB.settings.contentBorderWidth});copied_elem.remove();}
    function adjustModalProperties(){var size=[content.outerHeight(),content.outerWidth()],dim;if(obj.data('oB').css[0]){size[0]=obj.data('oB').css[0];}
        if(obj.data('oB').css[1]){size[1]=obj.data('oB').css[1];}
        if(content.attr('id')!=="ob_error"&&size[0]<oB.settings.contentMinSize[0]){size[0]=oB.settings.contentMinSize[0];}
        if(size[1]<oB.settings.contentMinSize[1]){size[1]=oB.settings.contentMinSize[1];}
        dim=[Math.round(size[0]),Math.round(size[1])];if(contentType!=="error"){setWindowMargin(dim[1]);}else{dim[1]=250;}
        $('#ob_float').css({"margin-bottom":-(dim[0]+(oB.settings.contentBorderWidth*2)+44)/2});$('#ob_content').css({"min-height":dim[0],"width":dim[1]});}
    function buildWindow(){var delayTimer=(obj.data('oB').delayTimer)?parseInt(obj.data('oB').delayTimer,10)+parseInt(oB.settings.slideshowTimer,10):oB.settings.slideshowTimer,target='target="_blank"',addThis=$('<a id="ob_share" class="addthis_button_compact"></a>'),shareHTML=$('<span class="at300bs at15nc at15t_compact"></span>').css('display','inline-block'),p=$(window).scrollTop();if(p===0){p=$(document).scrollTop();}
        if(p===0){p=window.pageYOffset;}
        $("#ob_container").css("margin-top",p);$('#ob_content').append('<div id="ob_title"></div>').append(content.addClass('ob_contents'));if(contentType!=="error"){$('#ob_content').append(ob_caption);if(obj.data('oB').link&&obj.data('oB').link!==""&&obj.data('oB').link!=="undefined"){if(obj.data('oB').linkTarget==="_self"){target='target="_self"';}
            title=(obj.data('oB').linkText&&obj.data('oB').linkText!=="undefined")?title+' <a href="'+obj.data('oB').link+'" '+target+' >'+obj.data('oB').linkText+'</a>':title+' <a href="'+obj.data('oB').link+'" '+target+' >'+obj.data('oB').link+'</a>';}
            if(oB.settings.addThis&&obj.data('oB').share!=="false"){addThis.addClass("ob_share");title=$.trim(title);if(title===""){title="&nbsp;";}
                $('#ob_title').append(addThis);addthis.button('.ob_share',{services_compact:oB.settings.addThisServices,ui_offset_left:-244,ui_offset_top:4},{url:ob_link,title:title});$('#ob_share').html('').append(shareHTML);}
            $('#ob_title').prepend(title).click(function(e){e.stopPropagation();});setControls();if(obj.data('oB').share!=="false"){$(document).trigger('oB_init',ob_link);oB.methods.logit('ID:'+oB.currentIndex+' href:"'+href+'" link:"'+ob_link+'"',true);}else{$(document).trigger('oB_init',"");oB.methods.logit('ID:'+oB.currentIndex+' href:"'+href+'"',true);}
            oB.progress=null;if(oB.playing){oB.slideshowTimer=setTimeout(function(){oB.methods.navigate(1);},delayTimer);}}else{oB.methods.logit('Could not find file');}
        oB.methods.showLoad(1);$('#ob_content').fadeIn(oB.settings.fadeTime,function(){$('#ob_overlay').css("height",$(document).height());});adjustModalProperties();}
    function throwError(){content=$('<div id="ob_error">'+oB.settings.notFound+'</div>');$('#ob_content').append(content.addClass('ob_contents'));contentType="error";clearTimeout(oB.controlTimer);clearTimeout(oB.slideshowTimer);clearTimeout(oB.scrollTimer);$(document).unbind("keydown").unbind("mousemove");buildWindow();}
    function showiFrame(){var dim=oB.methods.getSize(obj,[0,0]);obj.data('oB').css=dim;content=$('<div id="ob_iframe"><iframe allowTransparency="true" height="596" width="403" scrolling="no" type="text/html" seamless frameborder="0" hspace="0" src="'+href+'"></iframe></div>').css("width",dim[1]);//if(dim[0]!==0){content.css("height",dim[0]);}
        buildWindow();}
    function showInline(){var dim=oB.methods.getSize(obj,[0,0]),inline_content=$('<div class="inline_content"></div>'),s=obj.data('oB').size,clone,copied_elem,copied_content,height;if(href.match(/\?/)){href=href.substr(0,href.indexOf("?"));}
        if($(href).length&&$(href).html()!==""){if(s[0]===0){clone=$(href).clone();clone.css('display','block');copied_elem=$('<div id="ob_inline"></div>').css({visibility:"hidden",display:"block",position:"absolute",width:dim[1]});copied_content=$('<div class="inline_content"></div>').append(clone);copied_elem.append(copied_content);$("body").append(copied_elem);height=copied_elem.height();copied_content.empty().remove();copied_elem.remove();if(dim[0]>height){dim[0]=height;}}
            obj.data('oB').css=dim;content=$('<div id="ob_inline"></div>').css({"width":dim[1]});$(href).parent().addClass('ob_inline_content_holder');if($(href).is(':visible')){$(href).appendTo(inline_content).addClass('ob_inline_content');}else{$(href).appendTo(inline_content).addClass('ob_inline_content').addClass('ob_inline_hide').show();}
            content.append(inline_content);if(dim[0]!==0){content.css("height",dim[0]);}
            buildWindow();}else{throwError();}}
    function showVideo(){var dim=oB.methods.getSize(obj,[0,0]),src;switch(contentType){case"youtube":src='http://www.youtube.com/embed/'+obj.data('oB').id+'?autoplay=1&fs=1&modestbranding=1&rel=0&showsearch=0&wmode=transparent';break;case"vimeo":src='http://player.vimeo.com/video/'+obj.data('oB').id+'?title=0&byline=0&portrait=0&autoplay=1&wmode=transparent';break;case"viddler":src='http://cdn.static.viddler.com/flash/publisher.swf?key='+obj.data('oB').id+'&title=0&byline=0&portrait=0&autoplay=1&wmode=transparent';break;}
        obj.data('oB').css=dim;content=$('<div id="ob_iframe"><iframe allowTransparency="true" id="ob_video" width="100%" height="100%" type="text/html" frameborder="0" hspace="0" scrolling="no" src="'+src+'"></iframe></div>').css({"height":dim[0],"width":dim[1],"background-color":"#000000"});buildWindow();}
    function showFlash(){var dim=oB.methods.getSize(obj,[0,0]);obj.data('oB').css=dim;content=$('<div id="ob_video">'+'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+dim[1]+'" height="'+dim[0]+'" id="ob_flash_content" align="middle">'+'<param name="movie" value="'+href+'"/><param name="wmode" value="transparent"/><param name="allowFullScreen" value="true"/>'+'<embed name="ob_flash_content" flashVars="playerVars=autoPlay=yes" src="'+href+'" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" allowFullScreen="true" allowScriptAccess="always" width="'+dim[1]+'" height="'+dim[0]+'" type="application/x-shockwave-flash"></embed>'+'</object></div>').css({"height":dim[0],"width":dim[1]});buildWindow();}
    function showImage(){var img=new Image();content=$(img);content.load(function(){var oSize=[img.height,img.width],sSize=[0,0],running=false,dim,margin;if(obj.data('oB').size){sSize=obj.data('oB').size;}
        if(sSize[0]>0&&sSize[1]===0){sSize[1]=oSize[1]/oSize[0]*sSize[0];}else if(sSize[1]>0&&sSize[0]===0){sSize[0]=oSize[0]/oSize[1]*sSize[1];}else if(sSize[0]===0&&sSize[1]===0){sSize=[oSize[0],oSize[1]];}
        obj.data('oB').size=sSize;dim=oB.methods.getSize(obj,[0,0]);margin=(oB.settings.contentMinSize[0]/2)-(dim[0]/2);obj.data('oB').css=dim;$('#ob_content').unbind('click').click(function(e){e.stopPropagation();var fullDim=oB.methods.getSize(false,oSize,true),newDim=oB.methods.getSize(obj,[0,0]),setDim,p=$(window).scrollTop();if(p===0){p=$(document).scrollTop();}
            if(p===0){p=window.pageYOffset;}
            if(!running&&dim[0]<oSize[0]&&fullDim[1]!==newDim[1]){$('#ob_title').stop().hide();running=true;$('.ob_controls').fadeOut(50);if($(this).hasClass('expanded')||fullDim[0]<$('#ob_image').height()){$(this).removeClass('expanded');setDim=newDim;}else{$(this).addClass('expanded');setDim=fullDim;}
                setWindowMargin(setDim[1]);$("#ob_container").animate({"margin-top":p},400);$('#ob_float').animate({"margin-bottom":-(setDim[0]+(oB.settings.contentBorderWidth*2)+44)/2},400);$('#ob_content').animate({"min-height":setDim[0],"width":setDim[1]},400);$('#ob_image').animate({"height":setDim[0],"width":setDim[1]},400,function(){running=false;$('.ob_controls').fadeIn(50);$('#ob_title').stop().fadeIn(50);});}});if(dim[0]<oB.settings.contentMinSize[0]){content.css("margin-top",margin);}
        content.css({"height":dim[0],"width":dim[1]});buildWindow();}).error(function(){throwError();}).attr({src:href,id:'ob_image'});}
    switch(contentType){case"iframe":case"pdf":showiFrame();break;case"image":case"flickr":case"picasa":showImage();break;case"inline":showInline();break;case"youtube":case"vimeo":case"viddler":showVideo();break;case"flash":showFlash();break;default:oB.methods.logit('Unsupported Media: '+href);return false;}},createCustom:function(content,o){if(o){$.extend(oB.settings,o);}
    if(content.href==="undefined"||content.href===""){return false;}
    var obj=$('<a href="'+content.href+'"></a>'),html;if(content.title){obj.attr('title',content.title);}
    if(content.caption){obj.attr('data-ob_caption',content.caption);}
    if(content.link){obj.attr('data-ob_link',content.link);}
    if(content.linkText){obj.attr('data-ob_linkText',content.linkText);}
    if(content.linkTarget){obj.attr('data-ob_linkTarget',content.linkTarget);}
    if(content.delay){obj.attr('data-ob_delayTimer',content.delay);}
    obj.attr('data-ob_share','false');if(content.html){html=$(content.html).css('display','none');$(body).append(html);}
    if(content.gallery){obj.attr('data-ob',oB.settings.searchTerm+'['+content.gallery+']');}
    else{obj.attr('data-ob',oB.settings.searchTerm);}
    oB.methods.setupData(obj);oB.methods.create(obj);},navigate:function(d,i,o){if(o){$.extend(oB.settings,o);}
    if(!i){if(d===1){i=oB.currentIndex+1;}else if(d===-1){i=oB.currentIndex-1;}}
    if(oB.currentGallery[i]){oB.progress=true;$(document).trigger('oB_navigate',[i]);$('#ob_content').fadeOut(oB.settings.fadeTime,function(){if($('#ob_iframe').length>0){$('#ob_iframe iframe').attr('src','about:blank');}
        if($('#ob_inline').length){$('#ob_inline').find('.ob_inline_content').appendTo('.ob_inline_content_holder').removeClass('ob_inline_content');$('.ob_inline_hide').hide().removeClass('ob_inline_hide');$('.ob_inline_content_holder').removeClass('ob_inline_content_holder');}
        $(this).removeClass('expanded').css({"min-height":''}).empty();oB.delayTimer=oB.currentGallery[i].data('oB').delayTimer;oB.methods.showContent(oB.currentGallery[i]);});}else{oB.progress=null;}
    if(!oB.currentGallery[i+1]){oB.methods.slideshowPause();}},slideshowPlay:function(){$(document).trigger('oB_play');oB.playing=true;if(oB.currentGallery[parseInt($('#ob_content').attr('class').substr(7),10)+1]){oB.methods.navigate(1);}else{oB.methods.navigate(0,0);}},slideshowPause:function(){if(oB.playing){$(document).trigger('oB_pause');oB.playing=false;clearTimeout(oB.slideshowTimer);}},showLoad:function(x){var ob_load=$('<div id="ob_load"></div>').hide();if($('#ob_load').length>0||x){clearTimeout(oB.loadTimer);$('#ob_load').remove();}else{clearTimeout(oB.loadTimer);$("body").append(ob_load);oB.loadTimer=setTimeout(function(){$('#ob_load').fadeIn();},600);}},destroy:function(o,x){if($('#ob_content').length>0){$(document).trigger('oB_closing');if(o){$.extend(oB.settings,o);}
    oB.methods.showLoad(1);clearTimeout(oB.controlTimer);clearTimeout(oB.slideshowTimer);clearTimeout(oB.scrollTimer);if(oB.settings.orangeControls){$(document).orangeControls('destroy',oB.settings.fadeTime);}
    $(document).unbind("keydown").unbind("mousemove");$('#ob_container').stop().fadeOut(oB.settings.fadeTime,function(){if($('#ob_inline').length){$('#ob_inline').find('.ob_inline_content').appendTo('.ob_inline_content_holder').removeClass('ob_inline_content');$('.ob_inline_hide').hide().removeClass('ob_inline_hide');$('.ob_inline_content_holder').removeClass('ob_inline_content_holder');}
        if($('#ob_iframe').length>0){$('#ob_iframe iframe').attr('src','about:blank');}
        $(this).empty().remove();$(document).trigger('oB_closed');if(x&&$.isFunction(x)){x();}});$('#ob_overlay').fadeOut(oB.settings.fadeTime,function(){$(this).remove();if($('#ob_container').length>0){$('#ob_container').remove();}});}},getSize:function(obj,s,noMaxHeight){var ww=$(window).width(),wh=$(window).height(),mSize=[wh-44,ww-44],m,a,c;if(oB.docWidth>ww){mSize[1]=oB.docWidth-44;}
    if(oB.settings.showNav){mSize[1]-=120;}
    if(obj){s[0]=obj.data('oB').size[0];s[1]=obj.data('oB').size[1];m=oB.settings.contentMaxSize;a=oB.settings.videoAspect;c=obj.data('oB').contentType;if(c==="youtube"||c==="vimeo"||c==="viddler"||c==="flash"){if(s[0]>0&&s[1]===0){s[1]=a[1]/a[0]*s[0];}else if(s[1]>0&&s[0]===0){s[0]=a[0]/a[1]*s[1];}else if(s[0]===0&&s[1]===0){s=a;}}
        if(c==="iframe"||c==="pdf"){mSize[0]-=120;}
        if(m[0]===0&&c!=="iframe"&&c!=="pdf"){mSize[0]=0;}else if(m[0]>1&&m[0]<mSize[0]){mSize[0]=m[0];}else if(m[0]>0&&m[0]<=1){mSize[0]=Math.round(mSize[0]*m[0]);}
        if(m[1]>1&&m[1]<mSize[1]){mSize[1]=m[1];}else if(m[1]>0&&m[1]<=1){mSize[1]=Math.round(mSize[1]*m[1]);}
        if(s[1]<=1){s[1]=mSize[1];}
        if(s[0]===0&&mSize[0]!==0){s[0]=mSize[0];}}
    if(!noMaxHeight&&mSize[0]&&s[0]>mSize[0]){s[1]=s[1]*mSize[0]/s[0];s[0]=mSize[0];}
    if(s[1]>mSize[1]){s[0]=s[0]*mSize[1]/s[1];s[1]=mSize[1];}
    return[Math.round(s[0]),Math.round(s[1])];},getUrlVars:function(){var i,vars=[],hash,hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars[hash[0]]=hash[1];}
    return vars;},logit:function(m,d){if(d&&oB.settings.logging==="debug"){console.log('OrangeBox: '+m);}else if(!d&&oB.settings.logging){console.log('OrangeBox: '+m);}}}};$.fn.orangeBox=function(method){if(method==="showContent"||method==="getSize"||method==="getUrlVars"||method==="logit"){oB.methods.logit(method+' cannot be called externally');}else if(oB.methods[method]){return oB.methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return oB.methods.init.apply(this,arguments);}else{oB.methods.logit(method+' does not exist in OrangeBox');}};})(jQuery);}
jQuery(document).ready(function($){var searchTerm='a[data-ob*=lightbox], area[data-ob*=lightbox], a[rel*=lightbox], area[rel*=lightbox]';if(typeof orangebox_vars!=="undefined"){$.extend(oB.settings,orangebox_vars);}
    if(oB.settings.searchTerm!==""){searchTerm='a[data-ob*='+oB.settings.searchTerm+'], area[data-ob*='+oB.settings.searchTerm+'], a[rel*='+oB.settings.searchTerm+'], area[rel*='+oB.settings.searchTerm+']';}
    $(searchTerm).orangeBox();$(document).trigger('oB_ready');});


/*!
 * iCheck v0.8 jQuery plugin, http://git.io/uhUPMA
 */
(function(f,k,z,p,h,q,j,m,G,r,s,t,v,E){function A(a,c,g){var d=a[0],b=/ble/.test(g)?q:h;active="update"==g?{checked:d[h],disabled:d[q]}:d[b];if(/^ch|di/.test(g)&&!active)w(a,b);else if(/^un|en/.test(g)&&active)x(a,b);else if("update"==g)for(var b in active)active[b]?w(a,b,!0):x(a,b,!0);else if(!c||"toggle"==g){if(!c)a[t]("ifClicked");active?d[j]!==p&&x(a,b):w(a,b)}}function w(a,c,g){var d=a[0],b=a.parent(),B=c==q?"enabled":"un"+h,K=e(a,B+l(d[j])),m=e(a,c+l(d[j]));!0!==d[c]&&!g&&(d[c]=!0,a[t]("ifChanged")[t]("if"+
l(c)),c==h&&(d[j]==p&&d.name)&&f('input[name="'+d.name+'"]').each(function(){this!==d&&f(this).data(k)&&x(f(this),c)}));d[q]&&e(a,v,!0)&&b.find("."+k+"-helper").css(v,"default");b[r](m||e(a,c));b[s](K||e(a,B)||"")}function x(a,c,g){var d=a[0],b=a.parent(),f=c==q?"enabled":"un"+h,m=e(a,f+l(d[j])),p=e(a,c+l(d[j]));!1!==d[c]&&!g&&(d[c]=!1,a[t]("ifChanged")[t]("if"+l(f)));!d[q]&&e(a,v,!0)&&b.find("."+k+"-helper").css(v,"pointer");b[s](p||e(a,c)||"");b[r](m||e(a,f))}function H(a,c){a.data(k)&&(a.parent().html(a.attr("style",
a.data(k).s||"")[t](c||"")),a.off(".i").unwrap(),f('label[for="'+a[0].id+'"]').add(a.closest("label")).off(".i"))}function e(a,c,f){if(a.data(k))return a.data(k).o[c+(f?"":"Class")]}function l(a){return a.charAt(0).toUpperCase()+a.slice(1)}f.fn[k]=function(a){var c=navigator.userAgent,g=/ipad|iphone|ipod/i.test(c),d=":"+z+", :"+p;if(/^(check|uncheck|toggle|disable|enable|update|destroy)$/.test(a))return this.each(function(){var b=f(this);(b.is(d)?b:b.find(d)).each(function(){b=f(this);"destroy"==
a?H(b,"ifDestroyed"):A(b,!0,a)})});if("object"==typeof a||!a){var b=f.extend({checkedClass:h,disabledClass:q,labelHover:!0},a),e=b.handle,l=b.hoverClass||"hover",v=b.focusClass||"focus",I=b.activeClass||"active",J=!!b.labelHover,F=b.labelHoverClass||"hover",y=(""+b.increaseArea).replace("%","")|0;if(e==z||e==p)d=":"+e;-50>y&&(y=-50);return this.each(function(){var a=f(this);(a.is(d)?a:a.find(d)).each(function(){a=f(this);H(a);var d=this,e=d.id,C=-y+"%",u=100+2*y+"%",u={position:E,top:C,left:C,display:"block",
width:u,height:u,margin:0,padding:0,background:"#fff",border:0,opacity:0},C=g||/android|blackberry|windows phone|opera mini/i.test(c)?{position:E,visibility:"hidden"}:y?u:{position:E,opacity:0},B=d[j]==z?b.checkboxClass||"i"+z:b.radioClass||"i"+p,D=f('label[for="'+e+'"]').add(a.closest("label")),n=a.wrap('<div class="'+B+'"/>')[t]("ifCreated").parent().append(b.insert),u=f('<ins class="'+k+'-helper"/>').css(u).appendTo(n);a.data(k,{o:b,s:a.attr("style")}).css(C);b.inheritClass&&n[r](d.className);
b.inheritID&&e&&n.attr("id",k+"-"+e);"static"==n.css("position")&&n.css("position","relative");A(a,!0,"update");if(D.length)D.on(m+".i mouseenter.i mouseleave.i "+G,function(b){var c=b[j],e=f(this);if(!d[q])if(c==m?A(a,!1,!0):J&&(/ve|nd/.test(c)?(n[s](l),e[s](F)):(n[r](l),e[r](F))),g)b.stopPropagation();else return!1});a.on(m+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var c=b[j];b=b.keyCode;if(c==m)return!1;if("keydown"==c&&32==b)return d[j]==p&&d[h]||(d[h]?x(a,h):w(a,h)),!1;if("keyup"==
c&&d[j]==p)!d[h]&&w(a,h);else if(/us|ur/.test(c))n["blur"==c?s:r](v)});u.on(m+" mousedown mouseup mouseover mouseout "+G,function(b){var c=b[j],e=/wn|up/.test(c)?I:l;if(!d[q]){if(c==m)A(a,!1,!0);else{if(/wn|er|in/.test(c))n[r](e);else n[s](e+" "+I);if(D.length&&J&&e==l)D[/ut|nd/.test(c)?s:r](F)}if(g)b.stopPropagation();else return!1}})})})}return this}})(jQuery,"iCheck","checkbox","radio","checked","disabled","type","click","touchbegin.i touchend.i","addClass","removeClass","trigger","cursor","absolute");

// Generated by CoffeeScript 1.4.0

/*
eqHeight.coffee v1.2.3
http://jsliang.github.com/eqHeight.coffee

Copyright (c) 2013, Jui-Shan Liang <jenny@jsliang.com>
All rights reserved.
Licensed under GPL v2.
*/


(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    eqHeight: function(column_selector) {
      return this.each(function() {
        var columns, equalizer, _equalize_marked_columns;
        columns = $(this).find(column_selector);
        if (columns.length === 0) {
          columns = $(this).children(column_selector);
        }
        if (columns.length === 0) {
          return;
        }
        _equalize_marked_columns = function() {
          var marked_columns, max_col_height;
          marked_columns = $(".eqHeight_row");
          max_col_height = 0;
          marked_columns.each(function() {
            if ($(this).height() > max_col_height) {
              return max_col_height = $(this).height();
            }
          });
          marked_columns.height(max_col_height);
          return $(".eqHeight_row").removeClass("eqHeight_row");
        };
        equalizer = function() {
          var row_top_value;
          columns.height("auto");
          row_top_value = columns.first().position().top;
          columns.each(function() {
            var current_top;
            current_top = $(this).position().top;
            if (current_top !== row_top_value) {
              _equalize_marked_columns();
              row_top_value = $(this).position().top;
            }
            return $(this).addClass("eqHeight_row");
          });
          return _equalize_marked_columns();
        };
        $(window).load(equalizer);
        return $(window).resize(equalizer);
      });
    }
  });

}).call(this);
