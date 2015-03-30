'use strict';

var setNestedProp = require('./shared').setNestedProperty;

module.exports = function setFactory(src) {
  return function set(path, thing) {
    return setNestedProp(path, src, thing);
  }
}

