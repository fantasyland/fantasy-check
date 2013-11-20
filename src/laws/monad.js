var combinators = require('fantasy-combinators'),
    equality = require('./../equality'),

    apply = combinators.apply,
    identity = combinators.identity;

function law1(λ) {
    return function(type) {
        return λ.check(
            function(a) {
                var x = type.of(a).chain(apply(type.of)),
                    y = apply(type.of)(a);
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
                var x = type.of(a).chain(type.of),
                    y = type.of(a);
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
                var x = type.of(a).chain(type.of).chain(type.of),
                    y = type.of(function(x) {
                        return type.of(x).chain(type.of);
                    });
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        leftIdentity: law1,
        rightIdentity: law2,
        associativity: law3
    };
