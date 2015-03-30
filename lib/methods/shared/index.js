'use strict';

module.exports = {
  getNestedProperty: function(path, src) {
    if (!path) {
      throw new Error('You must pass a string argument to get().');
    }
    var paths = prepare(path);
    return paths.reduce(function(prev, next) {
      if (prev) {
        return prev[next];
      }
      return;
    }, src);
  },

  setNestedProperty: function(path, src, thing) {
    if (!path) {
      throw new Error('You must pass a string argument to set().');
    }
    if (!thing) {
      throw new Error('You must pass a second argument to set().');
    }
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

function prepare(path) {
  return path.split('.');
}
