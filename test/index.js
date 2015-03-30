'use strict';

var test = require('tape');
var objectify = require('../lib/objectify');

test('objectify', function(t) {
  t.plan(6);

  t.ok(objectify, 'exists');
  t.equal(typeof objectify, 'function', 'is a function');
  t.throws(
    objectify.bind(null, 'nonObject'),
    /You can only feed objects to objectify./,
    'Throws an error if a non-object is passed'
  );

  t.test('get', function(st) {
    st.plan(6);

    var obj           = {some: {deeply: {nested: {obj: { here: 'exists' }}}}},
        nestedAttr    = objectify(obj).get('some.deeply.nested.obj.here'),
        undefinedAttr = objectify(obj).get('some.lost.attr.not.found'),
        nestedObj     = objectify(obj).get('some.deeply.nested'),
        simplePath    = objectify(obj).get('some'),
        noResults     = objectify(obj).get('lost');

    st.equal(nestedAttr, 'exists', 'returns the deeply nested attribute');
    st.equal(undefinedAttr, undefined, 'returns undefined if not found');
    st.deepEqual(nestedObj, obj.some.deeply.nested, 'returns nested object');
    st.deepEqual(simplePath, obj.some, 'returns first nested object');
    st.notOk(noResults, 'Single path not found');

    var subject = objectify({});
    st.throws(
      subject.get,
      /You must pass a string argument to get()./,
      'should throw an error if no argument is passed to get()'
    );
  });

  t.test('isSet', function(st) {
    st.plan(7);

    var obj = {a: {deep: {nested: {thing: 'aString'}}}};
    var nestedAttrExists = objectify(obj).isSet('a.deep.nested.thing');
    var anotherNestedAttr = objectify(obj).isSet('a.deep');
    var yetAnotherNestedAttr = objectify(obj).isSet('a');
    var falseNestedAttr  = objectify(obj).isSet('a.deep.wrong');

    st.equal(nestedAttrExists, true, 'should be true');
    st.equal(anotherNestedAttr, true, 'should be true');
    st.equal(yetAnotherNestedAttr, true, 'should be true');
    st.equal(falseNestedAttr, false, 'should be false');

    var falseObj = {a: {nested: {falseAttr: false}}};
    var falsyAttr = objectify(falseObj).isSet('a.nested.falseAttr');

    st.ok(falsyAttr, 'should return predicate as true (it exists even if false)');

    var truthyObj = {a: {nested: {truthy: true}}};
    var truthyAttr = objectify(truthyObj).isSet('a.nested.truthy');

    st.equal(truthyAttr, true, 'should be true');

    var asUndefined = {a: {nested: {und: undefined}}};
    var undefinedAttr = objectify(asUndefined).isSet('a.nested.und');

    st.equal(undefinedAttr, false, 'should be false');
  });


  t.test('set', function(st) {
    st.plan(7);

    var src = {};
    var setProperty = objectify(src).set('a.very.nested.attr', true);
    st.equal(src.a.very.nested.attr, true, 'Set a very nested attribute in object');
    st.equal(setProperty, true, 'should be true');

    var context = 'iAmString';
    var aString = objectify(src).set('a.different.thing', context);
    st.equal(src.a.different.thing, context, 'should be a string');
    st.equal(aString, context)
    st.ok(src.a.very.nested.attr, 'should be still set');

    var subject = objectify({});
    st.throws(
      subject.set,
      /You must pass a string argument to set()./,
      'Throws an error if no path is set'
    );

    st.throws(
      subject.set.bind(null, 'a.b.c'),
      /You must pass a second argument to set()./,
      'Throws an error if no second argument is passed to set'
    );
  });
});

