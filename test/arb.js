'use strict';

const λ = require('../src/adapters/nodeunit');

exports.arb = {
    'when testing arb `Array` should return correct value': λ.check(
        a => λ.isArray(a),
        [Array]
    ),
    'when testing arb `Boolean` should return correct value': λ.check(
        a => λ.isBoolean(a),
        [Boolean]
    ),
    'when testing arb `Char` should return correct value': λ.check(
        a => λ.isString(a) && !!(a.charCodeAt(0) >= 32 && a.charCodeAt(0) <= 255),
        [λ.Char]
    ),
    'when testing arb `arrayOf` should return correct value': λ.check(
        a => λ.isArray(a),
        [λ.arrayOf(Number)]
    ),
    'when testing arb `objectLike` should return correct value': λ.check(
        a => λ.isObject(a) && λ.isNumber(a.a),
        [λ.objectLike({
            a: Number
        })]
    ),
    'when testing arb `Number` should return correct value': λ.check(
        a => λ.isNumber(a),
        [Number]
    ),
    'when testing arb `Object` should return correct value': λ.check(
        a => λ.isObject(a),
        [Object]
    ),
    'when testing arb `String` should return correct value': λ.check(
        a => λ.isString(a),
        [String]
    )
};