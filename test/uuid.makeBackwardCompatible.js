QUnit.module("UUID.makeBackwardCompatible()");

(function(QUnit) {
  "use strict";

  var n = 4;
  var options = { version: 1 };
  var v4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  var v1 = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f][13579bdf][0-9a-f]{10}$/;

  QUnit.test("before UUID.makeBackwardCompatible()", function(assert) {
    assert.expect(n * 2);
    for (var i = 0; i < n; i++) {
      var lft = UUID.generate();
      var rgt = UUID.generate(options);
      assert.ok(v4.test(lft) && (UUID.parse(lft).version === 4), "UUID.generate() returns UUIDv4: " + lft);
      assert.ok(v4.test(rgt) && (UUID.parse(rgt).version === 4), "UUID.generate({ version: 1 }) returns UUIDv4: " + rgt);
    }
  });

  QUnit.test("after UUID.makeBackwardCompatible()", function(assert) {
    assert.expect(n * 2);
    UUID.makeBackwardCompatible();
    for (var i = 0; i < n; i++) {
      var lft = UUID.generate();
      var rgt = UUID.generate(options);
      assert.ok(v4.test(lft) && (UUID.parse(lft).version === 4), "UUID.generate() returns UUIDv4: " + lft);
      assert.ok(v1.test(rgt) && (UUID.parse(rgt).version === 1), "UUID.generate({ version: 1 }) returns UUIDv1: " + rgt);
    }
  });

})(QUnit);

// vim: et ts=2 sw=2
