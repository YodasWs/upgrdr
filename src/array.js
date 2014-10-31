if (!Array.prototype.indexOf)
Array.prototype.indexOf=function(a,b){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined')}var length=this.length>>>0;b=+b||0;if(Math.abs(b)===Infinity){b=0}if(b<0){b+=length;if(b<0)b=0}for(;b<length;b++){if(this[b]===a)return b}return -1};
if (!Array.prototype.forEach)
Array.prototype.forEach=function(a, b){var T,k,O,l,m;if(this==null){throw new TypeError('this is null or not defined')}O=Object(this);l=O.length>>>0;if(typeof a!=="function"){throw new TypeError(a+' is not a function')}if(arguments.length>1)T=b;k=0;while(k<l){if(k in O){m=O[k];a.call(T,m,k,O)}k++}};
if (!Array.isArray)
Array.isArray=function(v){return Object.prototype.toString.call(v)==="[object Array]"};
