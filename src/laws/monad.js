var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,

    apply = combinators.apply,
    identity = combinators.identity;

function leftIdentity(type, f) {
    return function(a) {
        var x = type.of(a).chain(apply(type.of)),
            y = apply(type.of)(a);
        return equality(f(x), f(y));
    };
}

function rightIdentity(type, f) {
    return function(a) {
        var x = type.of(a).chain(type.of),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function associativity(type, f) {
    return function(a) {
        var x = type.of(a).chain(type.of).chain(type.of),
            y = type.of(a).chain(function(x) {
                return type.of(x).chain(type.of);
            });
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    return function(type, f) {
        return λ.check(leftIdentity(type, f), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(type, f) {
        return λ.check(rightIdentity(type, f), [λ.AnyVal]);
    };
}

function law3(λ) {
    return function(type, f) {
        return λ.check(associativity(type, f), [λ.AnyVal]);
    };
}

function laws(λ) {
    return function(type, f) {
        var x = [   leftIdentity(type, f),
                    rightIdentity(type, f),
                    associativity(type, f)];
        return λ.check(
            function(v) {
                return foldLeft(x, true, function(a, b) {
                    return a && b(v);
                });
            },
            [λ.AnyVal]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        leftIdentity: law1,
        rightIdentity: law2,
        associativity: law3,
        laws: laws
    };
