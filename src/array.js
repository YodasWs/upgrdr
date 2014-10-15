// JavaScript v1.6
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf)
Array.prototype.indexOf=function(searchElement,fromIndex){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined');}var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0;}if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0;}}for(;fromIndex<length;fromIndex++){if(this[fromIndex]===searchElement){return fromIndex;}}return -1;};
// JavaScript v1.8.5
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray)
Array.isArray = function (vArg) {
	return Object.prototype.toString.call(vArg) === "[object Array]";
};
