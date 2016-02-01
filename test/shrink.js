'use strict';

const λ = require('../src/adapters/nodeunit');

exports.shrink = {
    'when testing shrink for Array should return correct value': test => {
        const a = [1, 2, 3, 4, 5, 6];
        test.deepEqual(λ.shrink(a), [[], [1, 2, 3], [1, 2, 3, 4, 5]]);
        test.done();
    },
    'when testing shrink for Number should return correct value': test => {
        const a = 1000;
        test.deepEqual(λ.shrink(a), [0, 500, 750, 875, 938, 969, 985, 993, 997, 999]);
        test.done();
    },
    'when testing shrink for negative Number should return correct value': test => {
        const a = -1000;
        test.deepEqual(λ.shrink(a), [0, -500, -750, -875, -938, -969, -985, -993, -997, -999]);
        test.done();
    },
    'when testing shrink for String should return correct value': test => {
        const a = 'abcdefghi';
        test.deepEqual(λ.shrink(a), ['', 'abcde', 'abcdefg', 'abcdefgh']);
        test.done();
    }
};