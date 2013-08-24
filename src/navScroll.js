// For beautiful single-page navigation
upgrdr.add('jQuery');
if (!upgrdr._options) upgrdr._options = {};
if (!upgrdr._options.navScroll) upgrdr._options.navScroll = {
	easing:'easeInOutSine',
	maxTime:1000,
	minTime:400,
	margin:'40%',
	speed:800,
	unit:'ms'
};
$(document).ready(function() {
	$('body > nav > a[href^="#"]').bind('click.nav', function() {
		if ($(this).is('.active')) return false;
		var speed, pos = $($(this).attr('href')).offset().top;
		if ($(this).attr('href') == '#top') pos = 0;
		// Calculate Animation Runtime
		switch(upgrdr.options().navScroll.unit) {
		case 'ms': // milliseconds
			speed = upgrdr.options().navScroll.speed;
			break;
		case 'sec': case 's': // seconds
			speed = upgrdr.options().navScroll.speed * 1000;
			break;
		case 'ms/hp': // milliseconds per 100 pixels
			speed = upgrdr.options().navScroll.speed * Math.abs($(document).scrollTop()- pos) / 100;
			break;
		case 'ms/kp': // milliseconds per 1000 pixels
			speed = upgrdr.options().navScroll.speed * Math.abs($(document).scrollTop()- pos) / 1000;
			break;
		}
		// Constrain animation runtime (default 400 < x < 1000)
		speed = Math.min(Math.max(speed, upgrdr.options().navScroll.minTime), upgrdr.options().navScroll.maxTime);
		// Scroll!
		$('body').stop(true, false).animate({
			scrollTop:pos
		}, speed, upgrdr.options().navScroll.easing, function() {
		});
		return false;
	});
	$(window).scroll(function() {
		var minScroll = parseInt($('body > nav').css('top'), 10) || 0;
		// Position Main Menu
		if ($('body').scrollTop() > minScroll) {
			$('body > nav').css({
				position:'fixed',top:'0px'
			});
		} else {
			$('body > nav').css({
				position:'',top:''
			});
		}
		// Active Current Nav Link
		var lastY = 0, navPos = -1;
		$('body > nav > a[href^="#"]').each(function(i) {
			lastY = $($(this).attr('href')).offset().top;
			if (typeof upgrdr.options().navScroll.margin == 'number')
				lastY -= upgrdr.options().navScroll.margin;
			else if (/\d+%/.test(upgrdr.options().navScroll.margin))
				lastY -= parseInt(upgrdr.options().navScroll.margin, 10) * $(window).height() / 100;
			if ($('body').scrollTop() < lastY) {
				navPos = Math.max(i-1, 0);
				return false;
			}
		}).removeClass('active');
		if (navPos < 0) navPos = $('body > nav > a[href^="#"]').length-1;
		if ($($('body > nav > a[href^="#"]').get(navPos)).attr('href') != '#top')
			$($('body > nav > a[href^="#"]').get(navPos)).addClass('active');
	}).keyup(function(event) {
		if (event.keyCode == 27) // Escape
			// Stop Automatic Scrolling
			$('body').stop(true, false);
	});
});