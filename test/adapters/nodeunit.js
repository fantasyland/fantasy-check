var λ = require('../../src/adapters/nodeunit');

exports.check = {
    'when testing arb `Array` should return correct value': function(test) {
        λ.check(
            function(a) {
                return λ.isArray(a);
            },
            [Array]
        )({
            ok: function(result) {
                test.ok(result);
            },
            done: function() {
                test.expect(1);
                test.done();
            }
        });
    },
    'when testing arb `Array` should return incorrect value': function(test) {
        λ.check(
            function(a) {
                return λ.isNumber(a);
            },
            [Array]
        )({
            ok: function(result) {
                test.ok(!result);
            },
            done: function() {
                test.expect(1);
                test.done();
            }
        });
    }
};

exports.async = {
    'when testing arb `Array` should return correct value': function(test) {
        λ.async(
            function(resolve) {
                return function(a) {
                    resolve(λ.isArray(a));
                };
            },
            [Array]
        )({
            ok: function(result) {
                test.ok(result);
            },
            done: function() {
                test.expect(1);
                test.done();
            }
        });
    },
    'when testing arb `Array` should return incorrect value': function(test) {
        λ.async(
            function(resolve) {
                return function(a) {
                    resolve(λ.isNumber(a));
                };
            },
            [Array]
        )({
            ok: function(result) {
                test.ok(!result);
            },
            done: function() {
                test.expect(1);
                test.done();
            }
        });
    }
};