'use strict';

module.exports = subjectify;

function subjectify(src) {
  if (typeof src !== 'object') {
    throw new Error('You can only feed objects to subjectify.');
  }
  return {
    get: getFactory(src),
    exists: existsFactory(src),
    set: setFactory(src)
  };
}

function getFactory(src) {
  return function get(path) {
    return getNestedProperty(path, src);
  };
}

function existsFactory(src) {
  return function exists(path) {
    var exists = getNestedProperty(path, src);
    return !!exists;
  };
}

function setFactory(src) {
  return function set(path, thing) {
    var paths = prepare(path);
    return paths.reduce(function(prev, next, i) {
      if (paths.length === paths.indexOf(paths[i]) + 1) {
        prev[next] = thing;
      } else if (!prev[next]) {
        prev[next] = {};
      }
      return prev[next];
    }, src);
  }
}

function getNestedProperty(path, src) {
  var paths = prepare(path);
  return paths.reduce(function(prev, next) {
    if (prev) {
      return prev[next];
    }
    return;
  }, src);
}

function prepare(path) {
  return path.split('.');
}
