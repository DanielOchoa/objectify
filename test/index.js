'use strict';

var test = require('tape');
var subjectify = require('../lib/subjectify');

test('subjectify', function(t) {
  t.plan(5);

  t.ok(subjectify, 'exists');
  t.equal(typeof subjectify, 'function', 'is a function');

  t.test('get', function(st) {
    st.plan(3);

    var obj = {some: {deeply: {nested: {obj: { here: 'exists' }}}}};
    var nestedAttr = subjectify(obj).get('some.deeply.nested.obj.here');
    var undefinedAttr = subjectify(obj).get('some.lost.attr.not.found');
    var nestedObj = subjectify(obj).get('some.deeply.nested');

    st.equal(nestedAttr, 'exists', 'returns the deeply nested attribute.');
    st.equal(undefinedAttr, undefined, 'returns undefined if not found.');
    st.deepEqual(nestedObj, obj.some.deeply.nested, 'returns nested object.');

  });

  t.test('exists', function(st) {
    st.plan(1);

    var obj = {a: {deep: {nested: {thing: true}}}};
    var nestedAttrExists = subjectify(obj).exists('a.deep.nested.thing');

    st.ok(nestedAttrExists, 'should be truthy.');
  });

  t.test('set', function(st) {
    st.plan(1);

    var obj = {};
    setProperty = subjectify(obj).set('a.very.nested.attr', true);

    st.equal(obj.a.very.nested.attr, true, 'Set a very nested attribute in object.');
  });
});

