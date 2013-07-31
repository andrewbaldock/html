/*  
	jQuery extension -- check to see if something exists
	stackoverflow.com/questions/920236/how-can-i-detect-if-a-selector-returns-null
	Used like:  jQuery("#notAnElement").exists();
*/
jQuery.fn.exists = function () {
	return this.length !== 0;
}

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
	if(andrew.wdevice == 'desktop' || andrew.wdevice == 'laptop' ){
		$('.navigation').show();
		$('.navigation').css('display','inline-block');
	}
	if(andrew.wdevice == 'phone' || andrew.wdevice == 'tablet' ){  
		$('#toplink').html('Top');
		if(andrew.tinyMenuShowing == false)	{
			$('.navigation').css('display','none');
		} else {
			$('.navigation').css('display','block');
		}
	} else {
		$('#toplink').html('<span class="fontawesome-double-angle-up"></span>');
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
					 $(".navigation").slideToggle("slow");
					 andrew.tinyMenuShowing = true;
				} else {
					 $(".navigation").slideToggle("slow");
					 andrew.tinyMenuShowing = false;
				}
				andrew.navStay();
		});
		
		$(".btn_dropdown").hover(
			function () {
				 $(".navigation").slideToggle("slow");
				 andrew.tinyMenuShowing = true;
			},
			function () {
				//nuttin
			}
		);
		
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
    andrew.navStay();
});

$(window).bind('resize', function () {
		andrew.wwUpdate();
    andrew.sliderHeight();
    andrew.mymargtop();
    andrew.tinyMenuShowing = false;
    andrew.navStay();
});