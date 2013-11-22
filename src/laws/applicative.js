var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,

    compose = combinators.compose,
    identity = combinators.identity,
    thrush = combinators.thrush;

function id(type, f) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function composition(type, f) {
    return function(a) {
        var x = type.of(compose).ap(type.of(identity)).ap(type.of(identity)).ap(type.of(a)),
            y = type.of(identity).ap(type.of(identity).ap(type.of(a)));
        return equality(f(x), f(y));
    };
}

function homomorphism(type, f) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(identity(a));
        return equality(f(x), f(y));
    };
}

function interchange(type, f) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(thrush(a)).ap(type.of(identity));
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    return function(type, f) {
        return λ.check(id(type, f), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(type, f) {
        return λ.check(composition(type, f), [λ.AnyVal]);
    };
}

function law3(λ) {
    return function(type, f) {
        return λ.check(homomorphism(type, f), [λ.AnyVal]);
    };
}

function law4(λ) {
    return function(type, f) {
        return λ.check(interchange(type, f), [λ.AnyVal]);
    };
}

function laws(λ) {
    return function(type, f) {
        var x = [   id(type, f),
                    composition(type, f),
                    homomorphism(type, f),
                    interchange(type, f)];
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
        identity: law1,
        composition: law2,
        homomorphism: law3,
        interchange: law4,
        laws: laws
    };
