'use strict';

var getNestedProps = require('./shared').getNestedProperty;

module.exports = function existsFactory(src) {
  return function exists(path) {
    var exists = getNestedProps(path, src);
    return !!exists;
  };
}
