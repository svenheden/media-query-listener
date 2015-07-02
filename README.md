# media-query-listener

[![NPM version][npm-image]][npm-url]

> A module for observing media query breakpoint changes defined in CSS. A common way to accomplish this is to use `window.matchMedia()`, but if we want to use the same Media Queries in our JavaScript as in our CSS we have to define them in both environments. Since we're good developers and follow the [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) and [SSOT](https://en.wikipedia.org/wiki/Single_Source_of_Truth) principles we don't like doing this, and should use this module instead.


## Install

```
$ npm install --save media-query-listener
```


## Usage

### CSS

In your CSS where you probably already have a few Media Queries set up, add a name to your breakpoints by adding the names as content to the `body:after` pseudo element. The Media Queries can be of any type and the names can be any strings. It should look something like this...

```
body:after {
    display: none; // this is needed to not display the breakpoint names on the page
    content: "small";
}

@media (min-width: 600px) {
    body:after {
        content: "medium";
    }
}

@media (min-width: 1000px) {
    body:after {
        content: "large";
    }
}
```

### JavaScript

If you want to use this module with Browserify you can require it as usual with `var mqListener = require('media-query-listener');`. If you want to use it without a build step you can download [mq-listener.js](dist/mq-listener.js) or the minified version [mq-listener.min.js](dist/mq-listener.min.js) from this repo and add it to your page with a `<script>` tag or include it in some other way.

Then you can then listen to events in your JavaScript for when a certain breakpoint is entered by the viewport like this...

```js
mqListener.on('small', function() {
    // We now entered a breakpoint defined as "small" in the CSS.
});

mqListener.on('medium', function() {
    // We now entered a breakpoint defined as "medium" in the CSS.
});

mqListener.on('change', function(breakpoint) {
    // We now entered a breakpoint and the 'breakpoint' parameter contains the current breakpoint defined in the CSS.
});
```


## Methods

### on(name, callback[, context])

Subscribe to a breakpoint change event

* `name` - the name of the breakpoint to subscribe to, as defined in the CSS
* `callback` - the function to call when the breakpoint is entered
* `context` - (OPTIONAL) - the context to bind the event callback to

### once(name, callback[, context])

Subscribe to a breakpoint change event only **once**

* `name` - the name of the breakpoint to subscribe to, as defined in the CSS
* `callback` - the function to call when the breakpoint is entered
* `context` - (OPTIONAL) - the context to bind the event callback to

### off(name[, callback])

Unsubscribe from a breakpoint change event or all events. If no callback is provided, it unsubscribes you from all events.

* `name` - the name of the breakpoint to unsubscribe from, as defined in the CSS
* `callback` - the function used when binding to the event


## License

MIT © [Jonathan Persson](https://github.com/jonathanp)

[npm-url]: https://npmjs.org/package/media-query-listener
[npm-image]: https://badge.fury.io/js/media-query-listener.svg