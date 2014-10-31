upgrdr
======

Upgrading JavaScript in IE8, providing polyfills for HTML5, and looking at HTML5.1

## Adding to Your Site ##

```html
<script src="batch.js"></script>
<script>
upgrdr.add('jQuery', 'array', 'history');
</script>
```

Or more directly if you choose:

```html
<script src="src/string.js"></script>
<!--[if lte IE 8]><script src="src/array.js"></script><![endif]-->
<!--[if lte IE 9]><script src="src/history.js" async></script><![endif]-->
<!--[if lte IE 9]><script src="src/ie.js" async></script><![endif]-->
```

## HTML5 Polyfills ##

### history.js ###

For IE7-9

Polyfills the History API (history.popState, pushState, replaceState) using onhashchange.

### ie.js ###

For IE 9 and lower

Polyfills `input[placeholder]`, though currently only for input elements at time of document load...

Requires jQuery or [Zepto.js](http://zeptojs.com/)

## JavaScript Upgrades ##

For older browsers, especially people stuck on old versions of IE.

### JavaScript v1.6
* [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
* [Array.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

### JavaScript v1.8.1
* [String.prototype.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
  However, I have extended this function to act more like PHP's trim() by accepting a string of characters to remove in addition to whitespace.
  ```javascript
  str = "Hello World"
  console.log(str.trim('Hdl'))
  // ello Wor
  ```
### JavaScript v1.8.5
* [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

### json.js ###

Gives you `JSON.parse()` in very old browsers.

Only needed with IE6/7.

```html
<!--[if lt IE 9]>
<script src="src/array.js" async></script>
<script src="src/string.js" async></script>
<script src="src/math.js" async></script>
<![endif]-->
<!--[if lt IE 8]><script src="src/json.js" async></script><![endif]-->
```
