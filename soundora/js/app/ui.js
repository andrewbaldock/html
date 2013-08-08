define(["jquery", "soundcloud", "player"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      	
      	String.prototype.replaceAll = function(str1, str2, ignore) {
   				return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
				};
      	
      		//Get URL Params
				aB.fn.getUrlParam = function (paramName) {
					paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
					var regexS = "[\\?&]" + paramName + "=([^&#]*)";
					var regex = new RegExp(regexS);
					var results = regex.exec(window.location.href);
					if (results === null) { 
						return false; 
					} else {
						return results[1];
					}
				};

				$('#thequery').slideDown();

      	$('#thequery button').click(function(soundcloud){
      		$('#thequery').hide();
      		$('#spinner').show();
      	
      		var usrInput = $('#thequery input').val(); 
      		aB.tracks = {};
      		aB.tracks.played = 0;
      		
      		SC.initialize({
    				client_id: '3b56bf42a48bcfe2379a7950bc9dcf95',
    				redirect_uri: "http://andrewbaldock.com/soundora/callback.html"
  				});
					

					console.log('searching on ' + usrInput);
					$('#results').html('').show();

					SC.get('/tracks', { q: usrInput }, function(result) {
							console.log(result + ' ' + result.length);
							// put 'em in teh dom

							for (var i=0;i<result.length;i++){ 			
								var track = result[i];
								aB.tracks['trk' + (i+1)] = track; //push to global aB object

								$('#results').append('<div class="track-wrap"  style="background-image:url(' + track.waveform_url + ');"><div class="track" style="background-image:url(' + track.artwork_url + ');" data-trk="' + (i+1) + '" id="trk' + track.id + '"><br><br>' + track.user.username + '<br>' + track.title + '</div></div>');
							};
							
							var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3'
							
							aB.fn.updatePlaying = function (trackId){
								$('.track').removeClass('isPlaying');
								var trkId = '#trk' + trackId;
								$(trkId).addClass('isPlaying');
							}
						
							aB.fn.advanceTrack = function (){
								console.log('advancing...');
								$('.track').removeClass('isPlaying');
								aB.tracks.played = aB.tracks.played + 1;
								var nextId = '#trk' + aB.tracks['trk' + aB.tracks.played].id;
								$(nextId).click();
							}
						
						  $('.track').click(function(){
								var Id = this.id.replace('trk','');
								var url = 'http://api.soundcloud.com/tracks/' + Id;
								
								var iframe = document.querySelector('#widget');
								iframe.src = 'https://w.soundcloud.com/player/?url=' + url + sc_options;		
								
								aB.widget = SC.Widget(iframe);	
								
								aB.widget.unbind(SC.Widget.Events.FINISH, function(eventData) {
										//unbound
								});

								setTimeout(function(){
									aB.widget.bind(SC.Widget.Events.FINISH, function(eventData) {
										console.log('song has finished');
										aB.fn.advanceTrack();
									});
								},5000); 

								aB.fn.updatePlaying(Id); // css
								
							});
							
							$('#spinner').hide('fastest');
							
							$('#thequery').fadeIn();

							

							//launch the player
							require(['player'], function (player) {
								if (aB.tracks.trk1.kind != undefined) {
									//expose the player
									$('#player').show('fastest');
									console.log('readying track ' + aB.tracks.trk1.id);						

									//play first result
									aB.fn.updatePlaying(aB.tracks.trk1.id);
									aB.tracks.played = 1;
									
									var firstSong = '#trk' + aB.tracks.trk1.id;
									$(firstSong).click();
									
									/*var newSoundUrl = 'http://api.soundcloud.com/tracks/' + aB.tracks.trk1.id;
					
									var iframe = document.querySelector('#widget');
									iframe.src = 'https://w.soundcloud.com/player/?url=' + newSoundUrl + sc_options;
									
									var wIdget = SC.Widget(iframe);
									wIdget.bind(SC.Widget.Events.FINISH, function(eventData) {
											console.log('song has finished');
											aB.fn.advanceTrack();
											
									}); */



								 } else {
								 	alert('no results');
								 }//end if
							 });//end require;
							
							
						}); // end SC.get			
  				
      	}); // end click
      	
				//interesting random queries
				aB.seeds = ['night drive',
					'nudisco technokut',
					'band of horses infinite',
					'seadisco',
					'her favorite song',
					'bill evans',
					'dekire',
					'first fires grey reverend',
					'aeroplane',
					'inside my love disco',
					'kimbra remix'];

				var seed = aB.seeds[Math.floor(Math.random()*aB.seeds.length)]; // get a random item
				$('#query').val(seed);
      	
      	var autostart = aB.fn.getUrlParam('play');
				if(autostart != false) {
					autostart = autostart.replaceAll('+', ' ');
					autostart = autostart.replaceAll('%20', ' ');
					$('#query').val(autostart);
					$('#thequery button').click();
				} else {
					$('#thequery input#query').focus();
				}
      	
      	//handle return key
      	$('input #query').on('keydown', function(event) { if (event.which == 13 || event.keyCode == 13) { e.preventDefault();$('#thequery button').click(); } });
      	
      	$('#joinlink').click(function(e){
      		e.preventDefault;
      		$('#loginpanel').hide('fastest');
      		$('#newuserpanel').toggle('fastest');
      	});
      	$('#loginlink').click(function(e){
      		e.preventDefault;
      		$('#newuserpanel').hide('fastest');
      		$('#loginpanel').toggle('fastest');
      	});
      	
      });
  };
  aB.fn.ui();
});
