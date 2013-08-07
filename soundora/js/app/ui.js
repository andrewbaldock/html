define(["jquery", "soundcloud"], function($) {
  aB.fn.ui = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	console.log('soundcloud loaded');
      	
      	$('#getuser').show('slowest');
      	
      	$('#getuser button').click(function(soundcloud){
      		var usrInput = $('#getuser input').val(), songs={}; 
      		aB.tracks = {};
      		
      		SC.initialize({
    				client_id: '3b56bf42a48bcfe2379a7950bc9dcf95',
    				redirect_uri: "http://andrewbaldock.com/cool/callback.html",
  				});
					

					console.log('searching on ' + usrInput);
					$('#results').show('fastest');
					
					SC.get('/tracks', { q: usrInput }, function(result) {
						console.log(result + ' ' + result.length);
						// put 'em in teh dom

						for (var i=0;i<result.length;i++){ 			
							var track = result[i];
							aB.tracks['trk' + (i+1)] = track; //push to global aB object
							$('#results').prepend('<div class="track" style="background-image:url(' + track.waveform_url + ');" id="trk' + track.id + '">id:' + track.id + '<br>' + track.title + '</div>');
						}
						
						  $('.track').click(function(){
								var id = this.id.replace('trk','');
								SC.stream("/tracks/" + id, function(sound){
  								sound.play();
								});
							});
						
          
					});
  				
      	});
      });
  };
  aB.fn.ui();
});
