var combinators = require('fantasy-combinators'),
    equality = require('./../equality'),

    compose = combinators.compose,
    identity = combinators.identity;

function law1(λ) {
    return function(create) {
        return λ.check(
            function(a) {
                var x = create(a).map(identity),
                    y = create(a);
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

function law2(λ) {
    return function(create) {
        return λ.check(
            function(a) {
                var x = create(a).map(compose(identity, identity)),
                    y = create(a).map(identity).map(identity);
                return equality(x, y);
            },
            [λ.AnyVal]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        identity: law1,
        composition: law2
    };
