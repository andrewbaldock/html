define(["jquery", "soundcloud", "player"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      	
      	$('#thequery').show();

      	$('#thequery button').click(function(soundcloud){
      		$('#thequery').hide();
      		$('#spinner').show();
      	
      		var usrInput = $('#thequery input').val(), songs={}; 
      		aB.tracks = {};
      		
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

								$('#results').append('<div class="track-wrap"  style="background-image:url(' + track.artwork_url + ');"><div class="track" style="background-image:url(' + track.waveform_url + ');" id="trk' + track.id + '"><br>' + track.user.username + '<br>' + track.title + '</div></div>');
							};
							
							var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3'
							
							aB.fn.updatePlaying = function (trackId){
								$('.track').removeClass('isPlaying');
								var trkId = '#trk' + trackId;
								$(trkId).addClass('isPlaying');
							}
						
						  $('.track').click(function(){
								var Id = this.id.replace('trk','');
								var url = 'http://api.soundcloud.com/tracks/' + Id;
								var myframe = document.getElementById('sc-widget');
								myframe.src = 'https://w.soundcloud.com/player/?url=' + url + sc_options;
								aB.fn.updatePlaying(Id);
							});
							
							$('#spinner').hide('fastest');
							$('#thequery').fadeIn();

						


							require(['player'], function (player) {
								if (aB.tracks.trk1.kind == "track") {
									//expose the player
									$('#player').show('fastest');
									console.log('readying track ' + aB.tracks.trk1.id);
									//fire the player up
								
									var widgetIframe = document.getElementById('sc-widget'),
											widget       = SC.Widget(widgetIframe),
											newSoundUrl = 'http://api.soundcloud.com/tracks/' + aB.tracks.trk1.id;
									//play first result
									widgetIframe.src = 'https://w.soundcloud.com/player/?url=' + newSoundUrl + sc_options;
									aB.fn.updatePlaying(aB.tracks.trk1.id);


								 } //end if
							 });//end require;
							
							
							
					}); // end SC.get
					
					
  				
      	}); // end click
      	
      	$('#thequery input#query').focus();
      	
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
