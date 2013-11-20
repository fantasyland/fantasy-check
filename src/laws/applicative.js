var combinators = require('fantasy-combinators'),
    equality = require('./../equality'),

    compose = combinators.compose,
    identity = combinators.identity,
    thrush = combinators.thrush;

function law1(λ) {
    return function(type) {
        return λ.check(
            function(a) {
                var x = type.of(identity).ap(type.of(a)),
                    y = type.of(a);
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

function law2(λ) {
    return function(type) {
        return λ.check(
            function(a) {
                var x = type.of(compose).ap(type.of(identity)).ap(type.of(a)),
                    y = type.of(identity).ap(type.of(identity).ap(type.of(a)));
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

function law3(λ) {
    return function(type) {
        return λ.check(
            function(a) {
                var x = type.of(identity).ap(type.of(a)),
                    y = type.of(identity(a));
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

function law4(λ) {
    return function(type) {
        return λ.check(
            function(a) {
                var x = type.of(identity).ap(type.of(a)),
                    y = type.of(thrush(a)).ap(type.of(identity));
                return equality(x, y);
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
        interchange: law4
    };