'use strict';

module.exports = subjectify;

function subjectify(src) {
  if (typeof src !== 'object') {
    throw new Error('You can only feed objects to subjectify.');
  }
  return {
    get:    require('./methods/get')(src),
    exists: require('./methods/exists')(src),
    set:    require('./methods/set')(src)
  };
}

