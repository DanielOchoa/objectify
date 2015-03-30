'use strict';

var test = require('tape');
var subjectify = require('../lib/subjectify');

test('subjectify', function(t) {
  t.plan(6);

  t.ok(subjectify, 'exists');
  t.equal(typeof subjectify, 'function', 'is a function');
  t.throws(
    subjectify.bind(null, 'nonObject'),
    /You can only feed objects to subjectify./,
    'Throws an error if a non-object is passed'
  );

  t.test('get', function(st) {
    st.plan(5);

    var obj           = {some: {deeply: {nested: {obj: { here: 'exists' }}}}},
        nestedAttr    = subjectify(obj).get('some.deeply.nested.obj.here'),
        undefinedAttr = subjectify(obj).get('some.lost.attr.not.found'),
        nestedObj     = subjectify(obj).get('some.deeply.nested'),
        simplePath    = subjectify(obj).get('some'),
        noResults     = subjectify(obj).get('lost');

    st.equal(nestedAttr, 'exists', 'returns the deeply nested attribute');
    st.equal(undefinedAttr, undefined, 'returns undefined if not found');
    st.deepEqual(nestedObj, obj.some.deeply.nested, 'returns nested object');
    st.deepEqual(simplePath, obj.some, 'returns first nested object');
    st.notOk(noResults, 'Single path not found');
  });

  t.test('exists', function(st) {
    st.plan(7);

    var obj = {a: {deep: {nested: {thing: 'aString'}}}};
    var nestedAttrExists = subjectify(obj).exists('a.deep.nested.thing');
    var anotherNestedAttr = subjectify(obj).exists('a.deep');
    var yetAnotherNestedAttr = subjectify(obj).exists('a');
    var falseNestedAttr  = subjectify(obj).exists('a.deep.wrong');

    st.equal(nestedAttrExists, true, 'should be true');
    st.equal(anotherNestedAttr, true, 'should be true');
    st.equal(yetAnotherNestedAttr, true, 'should be true');
    st.equal(falseNestedAttr, false, 'should be false');

    var falsyObj = {a: {nested: {falsy: false}}};
    var falsyAttr = subjectify(falsyObj).exists('a.nested.falsy');

    st.equal(falsyAttr, false, 'should be false');

    var truthyObj = {a: {nested: {truthy: true}}};
    var truthyAttr = subjectify(truthyObj).exists('a.nested.truthy');

    st.equal(truthyAttr, true, 'should be true');

    var undefinedExists = {a: {nested: {und: undefined}}};
    var undefinedAttr = subjectify(undefinedExists).exists('a.nested.und');

    st.equal(undefinedAttr, false, 'should be false');
  });


  t.test('set', function(st) {
    st.plan(5);

    var src = {};
    var setProperty = subjectify(src).set('a.very.nested.attr', true);
    st.equal(src.a.very.nested.attr, true, 'Set a very nested attribute in object');
    st.equal(setProperty, true, 'should be true');

    var context = 'iAmString';
    var aString = subjectify(src).set('a.different.thing', context);
    st.equal(src.a.different.thing, context, 'should be a string');
    st.equal(aString, context)
    st.ok(src.a.very.nested.attr, 'should be still set');
  });
});

