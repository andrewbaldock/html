jQuery(document).ready(function() {
		var isVisible = {}
		//solutions variables
		isVisible.brainstorm = true;
		isVisible.organize = true;
		isVisible.plan = true;
		isVisible.execute = true;
		
		//video variables
		isVisible.ziba = true;
		isVisible.sensorlink = true;
		isVisible.ekso = true;
		isVisible.edc = true;
		isVisible.sharepoint = true;
		
    function removeIframes(){
  		jQuery('div#view-sensorlink iframe').remove();
			jQuery('div#view-ziba iframe').remove();
			jQuery('div#view-ekso iframe').remove();
			jQuery('div#view-edc iframe').remove();
			jQuery('div#view-sharepoint iframe').remove();
    }
		
		//solutions functions
		jQuery("a#click-brainstorm").click(function(event) {
			event.preventDefault();
			jQuery('div#view-brainstorm').show();
			jQuery('a#click-brainstorm').addClass('active');
			isVisible.brainstorm = true;
			if (isVisible.organize = true) {
				jQuery('div#view-organize').hide();
				jQuery('a#click-organize').removeClass('active');
				isVisible.organize = false;
			}
			if (isVisible.plan = true) {
				jQuery('div#view-plan').hide();
				jQuery('a#click-plan').removeClass('active');
				isVisible.plan = false;
			}
			if (isVisible.execute = true) {
				jQuery('div#view-execute').hide();
				jQuery('a#click-execute').removeClass('active');
				isVisible.execute = false;
			}
		}); 

		jQuery("a#click-organize").click(function(event) {
			event.preventDefault();
			jQuery('div#view-organize').show();
			jQuery('a#click-organize').addClass('active');
			isVisible.organize = true;
			if (isVisible.brainstorm = true) {
				jQuery('div#view-brainstorm').hide();
				jQuery('a#click-brainstorm').removeClass('active');
				isVisible.brainstorm = false;
			}
			if (isVisible.plan = true) {
				jQuery('div#view-plan').hide();
				jQuery('a#click-plan').removeClass('active');
				isVisible.plan = false;
			}
			if (isVisible.execute = true) {
				jQuery('div#view-execute').hide();
				jQuery('a#click-execute').removeClass('active');
				isVisible.execute = false;
			}
		}); 
		
		jQuery("a#click-plan").click(function(event) {
			event.preventDefault();
			jQuery('div#view-plan').show();
			jQuery('a#click-plan').addClass('active');
			isVisible.plan = true;
			if (isVisible.brainstorm = true) {
				jQuery('div#view-brainstorm').hide();
				jQuery('a#click-brainstorm').removeClass('active');
				isVisible.brainstorm = false;
			}
			if (isVisible.organize = true) {
				jQuery('div#view-organize').hide();
				jQuery('a#click-organize').removeClass('active');
				isVisible.organize = false;
			}
			if (isVisible.execute = true) {
				jQuery('div#view-execute').hide();
				jQuery('a#click-execute').removeClass('active');
				isVisible.execute = false;
			}
		});
		
		jQuery("a#click-execute").click(function(event) {
			event.preventDefault();
			jQuery('div#view-execute').show();
			jQuery('a#click-execute').addClass('active');
			isVisible.execute = true;
			if (isVisible.brainstorm = true) {
				jQuery('div#view-brainstorm').hide();
				jQuery('a#click-brainstorm').removeClass('active');
				isVisible.brainstorm = false;
			}
			if (isVisible.organize = true) {
				jQuery('div#view-organize').hide();
				jQuery('a#click-organize').removeClass('active');
				isVisible.organize = false;
			}
			if (isVisible.plan = true) {
				jQuery('div#view-plan').hide();
				jQuery('a#click-plan').removeClass('active');
				isVisible.plan = false;
			}
		});



		//video functions
		
		jQuery("a#click-sensorlink").click(function(event) {
			event.preventDefault();
			jQuery('div#view-sensorlink').show();
      removeIframes();
			jQuery('a#click-sensorlink').addClass('active');
			jQuery('img#sensorlink-inactive').replaceWith('<img src="/img/thumbnail-sensorlink-active.png" id="sensorlink-active" alt="Sensorlink">');
			isVisible.sensorlink = true;
			if (isVisible.ziba = true) {
				jQuery('div#view-ziba').hide();
				jQuery('a#click-ziba').removeClass('active');
				jQuery('img#ziba-active').replaceWith('<img src="/img/thumbnail-ziba-inactive.png" id="ziba-inactive" alt="Ziba">');
				isVisible.ziba = false;
			}
			if (isVisible.ekso = true) {
				jQuery('div#view-ekso').hide();
				jQuery('a#click-ekso').removeClass('active');
				jQuery('img#ekso-active').replaceWith('<img src="/img/thumbnail-ekso-inactive.png" id="ekso-inactive" alt="Ekso">');
				isVisible.ekso = false;
			}if (isVisible.edc = true) {
				jQuery('div#view-edc').hide();
				jQuery('a#click-edc').removeClass('active');
				jQuery('img#edc-active').replaceWith('<img src="/img/thumbnail-edc-inactive.png" id="edc-inactive" alt="EDC">');
				isVisible.edc = false;
			}
			if (isVisible.sharepoint = true) {
				jQuery('div#view-sharepoint').hide();
				jQuery('a#click-sharepoint').removeClass('active');
				jQuery('img#sharepoint-active').replaceWith('<img src="/img/thumbnail-sharepoint-inactive.png" id="sharepoint-inactive" alt="Sharepoint">');
				isVisible.sharepoint = false;
			}
		});

		jQuery("a#click-ziba").click(function(event) {
			event.preventDefault();
			jQuery('div#view-ziba').show();
      removeIframes();
			jQuery('a#click-ziba').addClass('active');
			jQuery('img#ziba-inactive').replaceWith('<img src="/img/thumbnail-ziba-active.png" id="ziba-active" alt="Ziba">');
			isVisible.ziba = true;
			if (isVisible.sensorlink = true) {
				jQuery('div#view-sensorlink').hide();
				jQuery('a#click-sensorlink').removeClass('active');
				jQuery('img#sensorlink-active').replaceWith('<img src="/img/thumbnail-sensorlink-inactive.png" id="sensorlink-inactive" alt="Sensorlink">');
				isVisible.sensorlink = false;
			}
			if (isVisible.ekso = true) {
				jQuery('div#view-ekso').hide();
				jQuery('a#click-ekso').removeClass('active');
				jQuery('img#ekso-active').replaceWith('<img src="/img/thumbnail-ekso-inactive.png" id="ekso-inactive" alt="Ekso">');
				isVisible.ekso = false;
			}
			if (isVisible.edc = true) {
				jQuery('div#view-edc').hide();
				jQuery('a#click-edc').removeClass('active');
				jQuery('img#edc-active').replaceWith('<img src="/img/thumbnail-edc-inactive.png" id="edc-inactive" alt="EDC">');
				isVisible.edc = false;
			}
			if (isVisible.sharepoint = true) {
				jQuery('div#view-sharepoint').hide();
				jQuery('a#click-sharepoint').removeClass('active');
				jQuery('img#sharepoint-active').replaceWith('<img src="/img/thumbnail-sharepoint-inactive.png" id="sharepoint-inactive" alt="Sharepoint">');
				isVisible.sharepoint = false;
			}
		});
		
		
		jQuery("a#click-ekso").click(function(event) {
			event.preventDefault();
			jQuery('div#view-ekso').show();
      removeIframes();
			jQuery('a#click-ekso').addClass('active');
			jQuery('img#ekso-inactive').replaceWith('<img src="/img/thumbnail-ekso-active.png" id="ekso-active" alt="Ekso">');
			isVisible.ekso = true;
			if (isVisible.ziba = true) {
				jQuery('div#view-ziba').hide();
				jQuery('a#click-ziba').removeClass('active');
				jQuery('img#ziba-active').replaceWith('<img src="/img/thumbnail-ziba-inactive.png" id="ziba-inactive" alt="Ziba">');
				isVisible.ziba = false;
			}
			if (isVisible.sensorlink = true) {
				jQuery('div#view-sensorlink').hide();
				jQuery('a#click-sensorlink').removeClass('active');
				jQuery('img#sensorlink-active').replaceWith('<img src="/img/thumbnail-sensorlink-inactive.png" id="sensorlink-inactive" alt="Sensorlink">');
				isVisible.sensorlink = false;
			}
			if (isVisible.edc = true) {
				jQuery('div#view-edc').hide();
				jQuery('a#click-edc').removeClass('active');
				jQuery('img#edc-active').replaceWith('<img src="/img/thumbnail-edc-inactive.png" id="edc-inactive" alt="EDC">');
				isVisible.edc = false;
			}
			if (isVisible.sharepoint = true) {
				jQuery('div#view-sharepoint').hide();
				jQuery('a#click-sharepoint').removeClass('active');
				jQuery('img#sharepoint-active').replaceWith('<img src="/img/thumbnail-sharepoint-inactive.png" id="sharepoint-inactive" alt="Sharepoint">');
				isVisible.sharepoint = false;
			}
		});
		
		jQuery("a#click-edc").click(function(event) {
			event.preventDefault();
			jQuery('div#view-edc').show();
      removeIframes();
			jQuery('a#click-edc').addClass('active');
			jQuery('img#edc-inactive').replaceWith('<img src="/img/thumbnail-edc-active.png" id="edc-active" alt="EDC">');
			isVisible.edc = true;
			if (isVisible.ziba = true) {
				jQuery('div#view-ziba').hide();
				jQuery('a#click-ziba').removeClass('active');
				jQuery('img#ziba-active').replaceWith('<img src="/img/thumbnail-ziba-inactive.png" id="ziba-inactive" alt="Ziba">');
				isVisible.ziba = false;
			}
			if (isVisible.sensorlink = true) {
				jQuery('div#view-sensorlink').hide();
				jQuery('a#click-sensorlink').removeClass('active');
				jQuery('img#sensorlink-active').replaceWith('<img src="/img/thumbnail-sensorlink-inactive.png" id="sensorlink-inactive" alt="Sensorlink">');
				isVisible.sensorlink = false;
			}
			if (isVisible.ekso = true) {
				jQuery('div#view-ekso').hide();
				jQuery('a#click-ekso').removeClass('active');
				jQuery('img#ekso-active').replaceWith('<img src="/img/thumbnail-ekso-inactive.png" id="ekso-inactive" alt="Ekso">');
				isVisible.ekso = false;
			}
			if (isVisible.sharepoint = true) {
				jQuery('div#view-sharepoint').hide();
				jQuery('a#click-sharepoint').removeClass('active');
				jQuery('img#sharepoint-active').replaceWith('<img src="/img/thumbnail-sharepoint-inactive.png" id="sharepoint-inactive" alt="Sharepoint">');
				isVisible.sharepoint = false;
			}
		});
		
		jQuery("a#click-sharepoint").click(function(event) {
			event.preventDefault();
			jQuery('div#view-sharepoint').show();
      removeIframes();
			jQuery('a#click-sharepoint').addClass('active');
			jQuery('img#sharepoint-inactive').replaceWith('<img src="/img/thumbnail-sharepoint-active.png" id="sharepoint-active" alt="Sharepoint">');
			isVisible.sharepoint = true;
			if (isVisible.ziba = true) {
				jQuery('div#view-ziba').hide();
				jQuery('a#click-ziba').removeClass('active');
				jQuery('img#ziba-active').replaceWith('<img src="/img/thumbnail-ziba-inactive.png" id="ziba-inactive" alt="Ziba">');
				isVisible.ziba = false;
			}
			if (isVisible.sensorlink = true) {
				jQuery('div#view-sensorlink').hide();
				jQuery('a#click-sensorlink').removeClass('active');
				jQuery('img#sensorlink-active').replaceWith('<img src="/img/thumbnail-sensorlink-inactive.png" id="sensorlink-inactive" alt="Sensorlink">');
				isVisible.sensorlink = false;
			}
			if (isVisible.ekso = true) {
				jQuery('div#view-ekso').hide();
				jQuery('a#click-ekso').removeClass('active');
				jQuery('img#ekso-active').replaceWith('<img src="/img/thumbnail-ekso-inactive.png" id="ekso-inactive" alt="Ekso">');
				isVisible.ekso = false;
			}
			if (isVisible.edc = true) {
				jQuery('div#view-edc').hide();
				jQuery('a#click-edc').removeClass('active');
				jQuery('img#edc-active').replaceWith('<img src="/img/thumbnail-edc-inactive.png" id="edc-inactive" alt="EDC">');
				isVisible.edc = false;
			}
		});
	
});	
