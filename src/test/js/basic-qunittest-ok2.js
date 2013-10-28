module( "module B", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test("basic test", function () {
	equal(1,1);
});


test("basic test 2", function () {
	equal(2,2);
});

