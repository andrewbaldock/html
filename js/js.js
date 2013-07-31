/*
 Color animation 20120928
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);
b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);

//namespacing
var andrew = {};
andrew.tinyMenuShowing = false;

//report to console
andrew.logThis = function(wut){
	if(typeof console != 'undefined'){
		console.log(wut);
	}
}

//report nav state
var navDisplayState = '';
andrew.navDisplayStateUpdate = function (){
	navDisplayState = $('.navigation').css('display');
	andrew.logthis(navDisplayState);
}

//get slide height
andrew.sliderHeight = function() {
    wh = $(window).height();
    $('#slide1').css({
        height: wh
    });
}

//what size 'device'
andrew.wdevice = 'desktop';
andrew.wwUpdate = function(){
	andrew.ww = $(window).width();
	if(andrew.ww >= 1024){andrew.wdevice = 'desktop'};
	if(andrew.ww >= 767 && andrew.ww < 1024){andrew.wdevice = 'laptop'};
	if(andrew.ww > 480 && andrew.ww < 767){andrew.wdevice = 'tablet'};
	if(andrew.ww <= 480){andrew.wdevice = 'phone'};
	andrew.logThis(andrew.wdevice);
}
andrew.navStay = function() {
	andrew.wwUpdate();
	if(andrew.wdevice == 'desktop')	{$('.navigation').css('display','inline-block!important');}
	if(andrew.wdevice == 'laptop')	{$('.navigation').css('display','inline-block!important');};
	if(andrew.wdevice == 'phone' || andrew.wdevice == 'tablet' ){ 
		if(andrew.tinyMenuShowing == false)	{
			$('.navigation').css('display','none');
		} else {
			$('.navigation').css('display','block');
		}
	}
}

//centers homepage blurb
andrew.mymargtop = function() {
    var body_h = $(window).height();
    var container_h = $('.filtr_bg').height();
    var marg_top = Math.abs((body_h - container_h) / 3);
    $('.filtr_bg').css('margin-top', marg_top);
    $('.filtr_bg').css('margin-bottom', marg_top);
    
    andrew.colorMeBadd();
}

//color animation
andrew.colorMeBadd = function() {
    $(".colormebadd").animate({
        color: '#CF2CC7'
    }, 3000, function () {
        $(".colormebadd").animate({
            color: '#2686E5'
        }, 3000, function () {
            $(".colormebadd").animate({
                color: '#D5BCE9'
            }, 3000);
        });
    });
}

jQuery(document).ready(function ($) {

    $(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');

    /**/
    if (mywindow.scrollTop() < 25) {
        $('.navigation li[data-slide="1"]').addClass('active');
    }
    /**/

    slide.waypoint(function (event, direction) {
        dataslide = $(this).attr('data-slide');
				$('.navigation li').removeClass('active');
				$('.navigation li[data-slide="' + dataslide + '"]').addClass('active')
        if (direction === 'down') {
           // do sometin
        } else {
					// do sometin else
        }
    });

    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    /*function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top + 2
        }, 2000, 'easeInOutQuint');
    }*/

    function goToByScroll(dataslide) {
        var goal = $('.slide[data-slide="' + dataslide + '"]').offset().top;
        if (mywindow.scrollTop() < goal) {
            var goalPx = goal + 5;
        } else {
            var goalPx = goal - 45;
        }
        htmlbody.animate({
            scrollTop: goalPx
        }, 2000, 'easeInOutQuint');
    }

    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


    // Sticky Navigation	
    $(".menu").sticky({
        topSpacing: 0
    });

		//NAVIGATION MENU - top sticky bar and phone-size floating menu toggle
		andrew.wwUpdate(); //screen size type
		
		$(".btn_dropdown").click(function () {
				if(andrew.tinyMenuShowing == false) {
					 $(".navigation").show("slow");
					 andrew.tinyMenuShowing = true;
				} else {
					 $(".navigation").hide("slow");
					 andrew.tinyMenuShowing = false;
				}
				andrew.navStay();
		});
		
		$(".navigation li").click(function () {
				if(andrew.wdevice == 'phone' || andrew.wdevice == 'tablet') {
						$(".navigation").hide("fast");
						andrew.tinyMenuShowing = false;
						andrew.navStay();
				}
		});


    //prettyPhoto
    $("a[rel^='prettyPhoto']").prettyPhoto();

    //Image hover
    $(".hover_img").live('mouseover', function () {
        var info = $(this).find("img");
        info.stop().animate({
            opacity: 0.11
        }, 300);
        $(".preloader").css({
            'background': 'none'
        });
    });
    $(".hover_img").live('mouseout', function () {
        var info = $(this).find("img");
        info.stop().animate({
            opacity: 1
        }, 300);
        $(".preloader").css({
            'background': 'none'
        });
    });
    
    $("#slide1").each(function () {
        var slide_h = $(this).height();
        $(this).css('background-size', '100% ' + slide_h + 'px');
    });
    andrew.wwUpdate();
    andrew.sliderHeight();
    andrew.mymargtop();
});

$(window).bind('resize', function () {
		andrew.wwUpdate();
    andrew.sliderHeight();
    andrew.mymargtop();
    andrew.tinyMenuShowing = false;
    andrew.navStay();
});