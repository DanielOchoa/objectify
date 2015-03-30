'use strict';

var getNestedProps = require('./shared').getNestedProperty;

module.exports = function getFactory(src) {
  return function get(path) {
    return getNestedProps(path, src);
  };
}


