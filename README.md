# Objectify [![Build Status](https://travis-ci.org/DanielOchoa/objectify.svg?branch=master)](https://travis-ci.org/DanielOchoa/objectify)

This node library allows you to set, get or check for the predicate of
deep nested objects.

It lets you avoid patterns such as:
```javascript
if (myObj.options && myObj.options.site && myObj.options.site.url) {
  // do something with myObj.options.site.url
}
```

And it helps you avoid the popular `undefined is not a function` error.

## Examples

```javascript
var objectify = require('node-objectify');

var src = {};

```

Check for the existence of a nested property:

```javascript
if (objectify(src).isSet('a.very.deeply.nested.attr')) {
  // true or false
  // do something with the nested attr here
  console.log(src.a.very.deeply.nested.attr);
}

```

Get a nested property:

```javascript

src = {a: {very: {deeply: {nested: { attr: 1 }}}}};

objectify(src).get('a.very.deeply.nested.attr'); // returns 1

objectify(src).get('a.non.existant.attr'); // returns undefined

```

Set a nested property:

```javascript

objectify(src).set('a.different.nested.attribute', 2); // returns 2

console.log(src.a.different.nested.attribute) // 2
```
