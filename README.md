upgrdr
======

Polyfills for HTML5, and looking at HTML5.1

## Adding to Your Site ##

```html
<script src="batch.js"></script>
<script>
upgrdr.add('jQuery', 'array', 'history');
</script>
```

Or more directly if you choose:

```html
<script src="string.js"></script>
<!--[if lte IE 8]><script src="array.js"></script><![endif]-->
<!--[if lte IE 9]><script src="history.js" async></script><![endif]-->
<!--[if lte IE 9]><script src="ie.js" async></script><![endif]-->
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

### array.js ###

For IE 8 and lower.

Adds `Array.prototype.indexOf()` and `Array.isArray()`

### string.js ###

Adds `String.prototype.trim()`.

I have actually expanded the function so you can pass in which characters you want trimmed like in PHP. Otherwise it trims white space as expected.

```html
<script src="string.js"></script>
<script>
document.write("Hello World".trim('Hde'))
// outputs 'llo worl'
</script>
```

### json.js ###

Gives you `JSON.parse()` in very old browsers.

Only needed with IE6/7.

```html
<!--[if lt IE 8]><script src="json.js" async></script><![endif]-->
```
