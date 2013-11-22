var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,

    compose = combinators.compose,
    identity = combinators.identity,
    thrush = combinators.thrush;

function id(type) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(a);
        return equality(x, y);
    };
}

function composition(type) {
    return function(a) {
        var x = type.of(compose).ap(type.of(identity)).ap(type.of(identity)).ap(type.of(a)),
            y = type.of(identity).ap(type.of(identity).ap(type.of(a)));
        return equality(x, y);
    };
}

function homomorphism(type) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(identity(a));
        return equality(x, y);
    };
}

function interchange(type) {
    return function(a) {
        var x = type.of(identity).ap(type.of(a)),
            y = type.of(thrush(a)).ap(type.of(identity));
        return equality(x, y);
    };
}

function law1(λ) {
    return function(type) {
        return λ.check(id(type), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(type) {
        return λ.check(composition(type), [λ.AnyVal]);
    };
}

function law3(λ) {
    return function(type) {
        return λ.check(homomorphism(type), [λ.AnyVal]);
    };
}

function law4(λ) {
    return function(type) {
        return λ.check(interchange(type), [λ.AnyVal]);
    };
}

function laws(λ) {
    return function(type) {
        var x = [   id(type),
                    composition(type),
                    homomorphism(type),
                    interchange(type)];
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
