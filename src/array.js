// JavaScript v1.6
if (typeof (new Array).indexOf !== 'function')
Array.prototype.indexOf = function(val) {
	for (var i=0; i<this.length; i++)
		if (this[i] === val) return i;
	return -1;
}
// JavaScript v1.8.5
if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}