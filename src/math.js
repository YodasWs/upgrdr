// ECMAScript 6 Math.sign()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
if (!Math.sign)
Math.sign = function(x) {
	if (isNaN(x)) return NaN
	else if(x === 0) return 0
	else return (x > 0 ? 1 : -1)
};
