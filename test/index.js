'use strict';

var test = require('tape');
var subjectify = require('../lib/subjectify');

test('subjectify', function(t) {
  t.plan(4);

  t.ok(subjectify, 'exists');
  t.equal(typeof subjectify, 'function', 'is a function');
  t.throws(
    subjectify.bind(null, 'nonObject'),
    /You can only feed objects to subjectify./,
    'Throws an error if a non-object is passed.'
  );

  t.test('get', function(st) {
    st.plan(5);

    var obj           = {some: {deeply: {nested: {obj: { here: 'exists' }}}}},
        nestedAttr    = subjectify(obj).get('some.deeply.nested.obj.here'),
        undefinedAttr = subjectify(obj).get('some.lost.attr.not.found'),
        nestedObj     = subjectify(obj).get('some.deeply.nested'),
        simplePath    = subjectify(obj).get('some'),
        noResults     = subjectify(obj).get('lost');

    st.equal(nestedAttr, 'exists', 'returns the deeply nested attribute.');
    st.equal(undefinedAttr, undefined, 'returns undefined if not found.');
    st.deepEqual(nestedObj, obj.some.deeply.nested, 'returns nested object.');
    st.deepEqual(simplePath, obj.some, 'returns first nested object.');
    st.notOk(noResults, 'Single path not found.');

  });
});

