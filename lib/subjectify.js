'use strict';

module.exports = subjectify;

function subjectify(src) {
  if (typeof src !== 'object') {
    throw new Error('You can only feed objects to subjectify.');
  }
  return {
    get: getFactory(src),
    exists: existsFactory(src)
  };
}

function getFactory(src) {
  return function get(path) {
    return reduceObject(path, src);
  };
}

function existsFactory(src) {
  return function exists(path) {
    var exists = reduceObject(path, src);
    return !!exists;
  };
}

function reduceObject(path, src) {
  var paths = path.split('.');
  return paths.reduce(function(prev, next) {
    if (prev) {
      return prev[next];
    }
    return;
  }, src);
}
