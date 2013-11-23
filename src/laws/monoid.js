var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,

    apply = combinators.apply,
    identity = combinators.identity;

function leftIdentity(type, f) {
    return function(a) {
        var x = type.empty().concat(type.of(a)),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function rightIdentity(type, f) {
    return function(a) {
        var x = type.of(a).concat(type.empty()),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    return function(type, f) {
        return λ.check(leftIdentity(type, f), [Number]);
    };
}

function law2(λ) {
    return function(type, f) {
        return λ.check(rightIdentity(type, f), [Number]);
    };
}

function laws(λ) {
    return function(type, f) {
        var x = [   leftIdentity(type, f),
                    rightIdentity(type, f)];
        return λ.check(
            function(v) {
                return foldLeft(x, true, function(a, b) {
                    return a && b(v);
                });
            },
            [Number]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        leftIdentity: law1,
        rightIdentity: law2,
        laws: laws
    };
