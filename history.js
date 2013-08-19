if (typeof history.pushState !== 'function') {
	history.states = [];
	history.pushState = function(state, title, url) {
		var search = {};
		var query = location.search || '?';
		var vars = query.replace(/^\?/,'').split('&');
		for (i in vars) {
			key = decodeURIComponent(vars[i].substr(0, vars[i].indexOf('=')));
			search[key] = decodeURIComponent(vars[i].substr(vars[i].indexOf('=')+1));
		}
		search.state = encodeURIComponent(JSON.stringify(state))
		search.url = encodeURIComponent(url);
// TODO: Use url as hash like ajaxify, https://gist.github.com/balupton/858093
		var hash = parseInt(location.hash.replace(/^[\/#]+/,''), 10) + 1 || 1;
		history.states[hash] = search;
		location.hash = hash;
	}
// TODO: history.replaceState
	history.replaceState = function(state, title, url) {
	}
	window.onhashchange = function() {
		history.state = history.states[parseInt(location.hash.substr(1), 10)];
		// Create popstate Event, http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
		var event;
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent("popstate", true, true);
		} else {
			event = document.createEventObject();
			event.eventType = "popstate";
		}
		event.eventName = 'popstate';
		event.memo = {};
		if (document.createEvent) {
			window.dispatchEvent(event);
		} else {
			window.fireEvent("on" + event.eventType, event);
		}
	}
}