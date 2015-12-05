// ECMAScript 6
if(!Number.isInteger)
Number.isInteger=function(a){return typeof a==='number'&&isFinite(a)&&Math.abs(a)<Math.pow(2,53)-1&&Math.floor(a)===a};
if(!Number.parseFloat)Number.parseFloat=parseFloat;
if(!Number.parseInt)Number.parseInt=parseInt;
