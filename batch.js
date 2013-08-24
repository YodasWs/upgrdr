if (typeof (new Array).indexOf !== 'function')
Array.prototype.indexOf = function(val) {
	for (var i=0; i<this.length; i++)
		if (this[i] === val) return i;
	return -1;
}
if (!window.upgrdr) upgrdr = {
	added:[],
	history:function() {
		if (typeof history.pushState !== 'function')
			document.write('<script src="/src/history.js" type="text/javascript"><\/script>');
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
			if (!window.jQuery && this.added.indexOf('jQuery') == -1 && ['select'].indexOf(arguments[i]) > -1) {
				document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript"><\/script>');
				this.added.push('jQuery');
			}
			// Download External File
			if (['select','array','string','batch'].indexOf(arguments[i]) > -1 && this.added.indexOf(arguments[i]) == -1) {
				document.write('<script src="/src/' + arguments[i] + '.js" type="text/javascript"><\/script>');
				this.added.push(arguments[i]);
				continue;
			}
		}
	}
};