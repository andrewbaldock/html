jQuery(function() {

	// Main Nav dropdown
	var $dropdownNav = jQuery('nav.main-nav li');

	$dropdownNav.hover(function() {
		jQuery(this).find('div.submenu').addClass('show');
	}, function() {
		jQuery(this).find('div.submenu').removeClass('show');
	});

	// Fire equal height plugin
	jQuery('.row').eqHeight('.equal-height');

	// Fire iCheck plugin for Customers Page
	jQuery('body.customers-page input').iCheck();


	// Check for "Checked" state of checkbox and apply on/off classes
	var sidebarCheckboxLi = jQuery('div.module-sidebar li input');
	var sidebarCheckbox = jQuery('div.module-sidebar div.checkbox-wrap input');

	jQuery(sidebarCheckboxLi).on('ifUnchecked', function() {
		var parent = jQuery(this).parents('li');
		jQuery(parent).removeClass('on');
	});

	jQuery(sidebarCheckboxLi).on('ifChecked', function() {
		var parentWrapper = jQuery(this).parents('div.module-sidebar').find('.checkbox-wrap');
		var parent = jQuery(this).parents('li');
		jQuery(parent).addClass('on');
		jQuery(parentWrapper).find('input').iCheck('uncheck');
	});


	jQuery(sidebarCheckbox).on('ifUnchecked', function() {
		var parent = jQuery(this).parents('div.checkbox-wrap');
		jQuery(parent).addClass('off');
	});

	jQuery(sidebarCheckbox).on('ifChecked', function() {
		var allChecks = jQuery(this).parents('div.module-sidebar').find('li');
		var parent = jQuery(this).parent('div.checkbox-wrap');

		jQuery(parent).removeClass('off');
		jQuery(allChecks).find('input').iCheck('uncheck');
	});
	

});