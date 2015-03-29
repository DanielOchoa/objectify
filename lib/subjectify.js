'use strict';

module.exports = subjectify;

function subjectify(src) {
  return {
    get: getFactory(src)
  };
}

function getFactory(src) {
  return function get(path) {
    var paths = path.split('.');
    return paths.reduce(function(prev, next) {
      if (prev) {
        return prev[next];
      }
      return;
    }, src);
  }
}
