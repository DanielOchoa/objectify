'use strict';

module.exports = objectify;

function objectify(src) {
  if (typeof src !== 'object') {
    throw new Error('You can only feed objects to objectify.');
  }
  return {
    get:    require('./methods/get')(src),
    isSet:  require('./methods/is-set')(src),
    set:    require('./methods/set')(src)
  };
}

