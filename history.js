// Polyfill HTML5 History API
if (typeof history.pushState !== 'function') {
	history.states = [];
	history.pushState = function(state, title, url) {
		// Polyfill HTML5 pushState with onhashchange
		state = state || {};
		state.url = url;
// TODO: Use url as hash like ajaxify, https://gist.github.com/balupton/858093
		var hash = parseInt(location.hash.replace(/^[\/#]+/,''), 10) + 1 || 1;
		history.states[hash] = state;
		history.state = state;
		location.hash = hash;
	}
	history.replaceState = function(state, title, url) {
		// Polyfill HTML5 replaceState with onhashchange
		state = state || {};
		state.url = url;
		var hash = parseInt(location.hash.replace(/^[\/#]+/,''), 10) || 0;
		history.states[hash] = state;
		history.state = state;
	}
	history.replaceState({}, null, location.href);
	if (!document.createEvent && !window.onpopstate)
		window.onpopstate = function(event) {};
	window.onhashchange = function() {
		var hash = parseInt(location.hash.replace(/^[\/#]+/,''), 10) || 0;
		history.state = history.states[hash];
		// Fire popstate Event
		if (window.jQuery) $(window).trigger('popstate');
		else if (document.createEvent) {
			var event = document.createEvent("HTMLEvents");
			event.initEvent("popstate", true, true);
			event.eventName = 'popstate';
			window.dispatchEvent(event);
		} else if (typeof window.onpopstate == 'function')
			window.onpopstate();
	}
}