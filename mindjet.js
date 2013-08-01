var secondsPass = 0;
var howManyChiclet = 0;
$(function () {
	myChart = $('#container').highcharts({
	
	    chart: {
	        type: 'gauge',
	        alignTicks: false,
	        plotBackgroundColor: null,
	        plotBackgroundImage: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
	        backgroundColor: null
	    },
	
	    title: {
	        text: 'Page Load Time'
	    },
	    
	    pane: {
	        startAngle: -150,
	        endAngle: 150
	    },	        
	
	    yAxis: [{
	        min: 0,
	        max: 20,
	        tickPosition: 'outside',
	        lineColor: '#C93682',
	        lineWidth: 2,
	        minorTickPosition: 'outside',
	        tickColor: '#C93682',
	        minorTickColor: '#C93682',
	        tickLength: 5,
	        minorTickLength: 5,
	        labels: {
	            distance: 5,
	            rotation: 'auto'
	        },
	        offset: -20,
	        endOnTick: false
	    }],
	
	    series: [{
	        name: 'Speed',
	        data: [16.08],
	        dataLabels: {
	            formatter: function () {
	                var secnds = this.y;
	                return '<span style="color:#339">'+ secnds + ' seconds</span><br/>';
	            },
	            backgroundColor: {
	                linearGradient: {
	                    x1: 0,
	                    y1: 0,
	                    x2: 0,
	                    y2: 1
	                },
	                stops: [
	                    [0, '#dedede']//,
	                    //[1, '#ccc']
	                ]
	            }
	        },
	        tooltip: {
	            valueSuffix: ' seconds'
	        }
	    }]
	
	},
	// onchartload
	function (chart) {
	  // nuttin
	});
    
  function draggedToUnicorn( event, ui ) {
  	var draggable = ui.draggable;
		var secondsPass = draggable.attr('data-time');
		var eleId = draggable.attr('id') + '';
  	console.log(eleId + " optimized, saving " + secondsPass + " seconds. ");
  	var point = Highcharts.charts[0].series[0].points[0];
  	var pointOrig = point.y;
  	var cleanVal = (pointOrig - secondsPass);
  	cleanVal = Math.round(cleanVal * 10) / 10;
  	point.update(cleanVal);
  	//$('#speedup').click();
  	
  	var noteCms = '<h3>Keep it simple silly!</h3>The website was being run an an open-source java CMS called OpenCMS.  The java stack added no appreciable value to the site; in fact it slowed it down, as did multiple nested .jsps used to generate each simple Web page.<br><br>By extracting all the HTML, CSS and javaScript content I was able to rebuild the site as simple HTML files running on a simple Apache server. This made developers very happy as they no longer had to code across a database to manage a webpage. <div style="text-align:left;display:block;width:100%;margin-left:30px;margin-right:20px;"><h3 style="font-family:Codystar, sans-serif">Issue: slow CMS/server. <br>Solution: move to Apache.  <br>Win: page load time decreased by ' + secondsPass + ' seconds</h3></div>'
  	
  	var noteHtml = '<h3>HTML Optimizations</h3>Because the code was accessible only through the OpenCMS UI, and only one section of a page could be edited at a time, this led to developers not structuring pages for optimal load speed.  <br><br>Once moved out of OpenCMS, the pages could be written in the correct structure for load optimization, with minified js and css, and javascript at the end of the page.<div style="text-align:left;display:block;width:100%;margin-left:30px;margin-right:20px;"><h3 style="font-family:Codystar, sans-serif">Issue: unoptimized HTML. <br>Solution: recode all pages with clean HTML structure<br>Win: page load time decreased by ' + secondsPass + ' seconds</h3></div>';
  	var noteCdn = '<h3>The Cookie Monster</h3>When a web page is requested, the server will send every cookie with every asset on the same server, which is very noisy.<br><br>I did finds and replaces throughout all the code to move all static images and other assets to a Content Delivery Network.<div style="text-align:left;display:block;width:100%;margin-left:30px;margin-right:20px;"><h3 style="font-family:Codystar, sans-serif">Issue: no CDN. <br>Solution: move assets to a CDN<br>Win: page load time decreased by ' + secondsPass + ' seconds</h3></div>';
  	var noteApache = '<h3>Apache</h3>Apache has many caching settings, rewrite rules, and other modules that can be customized and tweaked and tuned to perfection. (Such as Keep-alive).<br><br>Using the HTML5 Boilerplate as a reference, I tuned up the Apache settings.<div style="text-align:left;display:block;width:100%;margin-left:30px;margin-right:20px;"><h3 style="font-family:Codystar, sans-serif">Issue: Apache default settings are not necessarily fast. <br>Solution: tune up Apache<br>Win: page load time decreased by ' + secondsPass + ' seconds</h3></div>';
  	var noteTracking = '<h3>Too Many Dang Trackers</h3>The Marketing Department had multiple tracking tags form multiple vendors loading on each page, slowing down the page load.<br><br>I worked with <a href="http://www.tealium.com">Tealium</a> to install a tracking tag management GUI and CDN to mitigate this problem.<div style="text-align:left;display:block;width:100%;margin-left:30px;margin-right:20px;"><h3 style="font-family:Codystar, sans-serif">Issue: Lots of slow javascript from too many trackers <br>Solution: Tealium tracking tag CDN<br>Win: page load time decreased by ' + secondsPass + ' seconds</h3></div>';
  	
  	if(eleId == 'ss-cms'){
  		$('#fs-cms').show('slow');
  		$('#notes').html(noteCms);
  		$('#x').click(function(){$('#notes').hide();});
  	};
  	if(eleId == 'ss-html'){
  		$('#fs-html').show('slow');
  		$('#notes').html(noteHtml);
  	};
  	if(eleId == 'ss-cdn'){
  		$('#fs-cdn').show('slow');
  		$('#notes').html(noteCdn);
  	};
  	if(eleId == 'ss-apache'){
  		$('#fs-apache').show('slow');
  		$('#notes').html(noteApache);
  	};
  	if(eleId == 'ss-tracking'){
  		$('#fs-tracking').show('slow');
  		$('#notes').html(noteTracking);
  	};
  	
  	$(draggable).remove();
  	
  	howManyChiclet = howManyChiclet +1;
  	if(howManyChiclet == 5) {alert('You fixed the server and now Google SEO is going through the roof! Great job!');}
  	
  	
	}
  $('.slowstuff').draggable({ 
  	containment: "document",
  	revert: "invalid",
  	cursor: "pointer"
  });
  $('#unicorn').droppable( {
    drop: draggedToUnicorn,
    hoverClass: "esplode"
  });
   
});