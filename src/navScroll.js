// For beautiful single-page navigation

// jQuery Required :-\
upgrdr.add('jQuery')
upgrdr.add('math')

// Set Default Options
;(function(defaults) {
	var options = upgrdr.options('navScroll')
	for (i in defaults) {
		// Do not override user-entered options, if any
		if (!options[i])
			upgrdr.options('navScroll', i, defaults[i])
	}
})({easing:'easeInOutSine',maxTime:1000,minTime:400,margin:'40%',speed:800,unit:'ms'})

upgrdr.jqReady(function() { $(document).ready(function() {
	// On Navigation, Scroll into View
	$('body').on('click.nav', 'a[href^="#"]', function() {
		if ($(this).is('.active')) return false
		var speed, scrollStart = NaN, pos = $($(this).attr('href')).offset().top, scrollDiff = pos - $(document).scrollTop(),
			options = upgrdr.options('navScroll')
		if ($(this).attr('href') == '#top') pos = 0
		// Calculate Animation Runtime
		switch(options.unit) {
		case 'ms': // milliseconds
			speed = options.speed
			break
		case 'sec': case 's': // seconds
			speed = options.speed * 1000
			break
		case 'ms/hp': // milliseconds per 100 pixels
			speed = options.speed * Math.abs(scrollDiff) / 100
			scrollStart = options.maxTime / options.speed * 100
			break
		case 'ms/kp': // milliseconds per 1000 pixels
			speed = options.speed * Math.abs(scrollDiff) / 1000
			scrollStart = options.maxTime / options.speed * 1000
			break
		}
		// Set Minimum Animation Runtime
		speed = Math.max(speed, options.minTime)
		// If speed > maxTime, jump to where animation will take maxTime then animate scroll
		if (speed > options.maxTime) {
			if (isNaN(scrollStart)) speed = options.maxTime
			else {
				$('html, body').stop('scroll', true, false).animate({
					scrollTop: pos - Math.sign(scrollDiff) * scrollStart
				}, {
					duration: 0,
					queue: 'scroll'
				}).dequeue('scroll')
			}
		}

		// Scroll!
		$('body').stop('scroll', true, false).animate({
			scrollTop:pos
		}, {
			duration: speed,
			queue: 'scroll',
			easing: options.easing
		}).dequeue('scroll')
		return false
	})
	var moveMenu = function() {
		var minScroll = parseInt($('body > nav').css('top'), 10) || 0,
			lastY = 0, navPos = -1, navEle
		// Position Main Menu
		if ($('body').scrollTop() > minScroll) {
			$('body > nav').css({
				position:'fixed',top:'0px'
			})
		} else {
			$('body > nav').css({
				position:'',top:''
			})
		}
		// Active Current Nav Link
		$('body > nav > a[href^="#"]').each(function(i) {
			var options = upgrdr.options('navScroll'),
			   lastY = $($(this).attr('href')).offset().top
			// Set offset margin for distance active section is below scrollTop
			if (typeof options.margin == 'number')
				lastY -= options.margin
			else if (/\d+%/.test(options.margin))
				lastY -= parseInt(options.margin, 10) * $(window).height() / 100
			if ($('body').scrollTop() < lastY) {
				navPos = Math.max(i-1, 0)
				return false
			}
		}).removeClass('active')
		if (navPos < 0) navPos = $('body > nav > a[href^="#"]').length-1
		navEle = $($('body > nav > a[href^="#"]').get(navPos))
		if (navEle.attr('href') != '#top')
			navEle.addClass('active')
	}
	$(window).ready(moveMenu).scroll(moveMenu).keyup(function(event) {
		if (event.keyCode == 27) // Escape
			// Stop Automatic Scrolling
			$('body').stop('scroll', true, false)
	})
})})
