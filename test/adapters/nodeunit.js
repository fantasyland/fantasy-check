'use strict';

const λ = require('../../src/adapters/nodeunit');

exports.check = {
    'when testing arb `Array` should return correct value': test => {
        λ.check(
            a => λ.isArray(a),,
            [Array]
        )({
            ok: result => test.ok(result),
            done: () => {
                test.expect(1);
                test.done();
            }
        });
    },
    'when testing arb `Array` should return incorrect value': test => {
        λ.check(
            a => λ.isNumber(a),
            [Array]
        )({
            ok: result => test.ok(!result),
            done: () => {
                test.expect(1);
                test.done();
            }
        });
    }
};

exports.async = {
    'when testing arb `Array` should return correct value': test => {
        λ.async(
            resolve => a => resolve(λ.isArray(a)),
            [Array]
        )({
            ok: result => test.ok(result),
            done: () => {
                test.expect(1);
                test.done();
            }
        });
    },
    'when testing arb `Array` should return incorrect value': test => {
        λ.async(
            resolve => a => resolve(λ.isNumber(a)),
            [Array]
        )({
            ok: result => test.ok(!result),
            done: () => {
                test.expect(1);
                test.done();
            }
        });
    }
};