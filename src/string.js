// JavaScript v1.8.1
//if (typeof (new String).trim !== 'function')
// Extended by Sam Grundman on 5 Aug 2013
String.prototype.trim = function(chars) {
	return this.replace(new RegExp('^[' + (chars || '\\s') + ']+|[' + (chars || '\\s') + ']+$', 'g'), '');
};