if (typeof (new Array).indexOf !== 'function')
Array.prototype.indexOf = function(val) {
	for (var i=0; i<this.length; i++)
		if (this[i] === val) return i;
	return -1;
};
if (!window.upgrdr) upgrdr = {
	_options:{ // Default Options
	},
	// Let User Override Default Options
	options:function() {
		if (arguments.length) {
			arguments = Array.prototype.slice.call(arguments);
			var object = arguments.shift();
			if (!upgrdr._options[object])
				upgrdr._options[object] = {};
			for (i in arguments) {
				if (typeof arguments[i] == 'object')
					for (j in arguments[i])
						upgrdr._options[object][j] = arguments[i][j];
			}
		}
		// Return for chaining, e.g. upgrdr.options().scroll.easing
		return upgrdr._options;
	},
	added:[],
	history:function() {
		if (typeof history.pushState !== 'function')
			document.write('<script src="src/history.js"><\/script>');
	},
	add:function() {
		for(i=0; i<arguments.length; i++) {
			// Run upgrdr Function
			if (typeof this[arguments[i]] === 'function') {
				if (this.added.indexOf(arguments[i]) > -1) continue;
				this[arguments[i]]();
				this.added.push(arguments[i]);
				continue;
			}
			// Download jQuery
			if (!window.jQuery && this.added.indexOf('jQuery') == -1 && ['select','scroll'].indexOf(arguments[i]) > -1) {
				document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"><\/script>');
				this.added.push('jQuery');
			}
			// Download External File
			if ([
				'array',
				'math',
				'number',
				'select',
				'scroll',
				'string'
			].indexOf(arguments[i]) > -1 && this.added.indexOf(arguments[i]) == -1) {
				document.write('<script src="src/' + arguments[i] + '.js"><\/script>');
				this.added.push(arguments[i]);
				continue;
			}
		}
	}
};
