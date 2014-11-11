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
			document.write('<script src="src/history.js" type="text/javascript"><\/script>');
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
				document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript"><\/script>');
				this.added.push('jQuery');
			}
			// Download External File
			if (['select','array','string','scroll'].indexOf(arguments[i]) > -1 && this.added.indexOf(arguments[i]) == -1) {
				document.write('<script src="src/' + arguments[i] + '.js" type="text/javascript"><\/script>');
				this.added.push(arguments[i]);
				continue;
			}
		}
	},
	ready:function(cb){
		var c=0,a=function(){if(!c){if(document.readyState=='complete'){cb();c=true}}}
		if(Element.prototype.addEventListener)document.addEventListener('readystatechange',a)
		else if(Element.prototype.attachEvent)document.attachEvent('onreadystatechange',a)
	},
	jqReady:function(cb) {
		var c=0,a=function(){if(!c){if(document.readyState=='interactive'||document.readyState=='complete'){
			var m=document.getElementsByTagName('script'),i=0
			for(;i<m.length;i++)if(m[i].src.toLowerCase().indexOf('jquery')>-1){
				if(Element.prototype.addEventListener){m[i].addEventListener('load',cb);break}
				else if(Element.prototype.attachEvent){m[i].attachEvent('onload',cb);break}
			};c=1
		}}}
		if(Element.prototype.addEventListener)document.addEventListener('readystatechange',a)
		else if(Element.prototype.attachEvent)document.attachEvent('onreadystatechange',a)
	}
};
