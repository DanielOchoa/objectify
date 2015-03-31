'use strict';

var getNestedProps = require('./shared').getNestedProperty;

module.exports = function isSetFactory(src) {
  return function isSet(path) {
    var isSet = getNestedProps(path, src);
    return isSet === false || isSet === 0 || !!isSet;
  };
}
