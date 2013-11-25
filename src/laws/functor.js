var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,

    compose = combinators.compose,
    identity = combinators.identity;

function id(create, f) {
    return function(a) {
        var x = create(a).map(identity),
            y = create(a);
        return equality(f(x), f(y));
    };
}

function composition(create, f) {
    return function(a) {
        var x = create(a).map(compose(identity)(identity)),
            y = create(a).map(identity).map(identity);
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    return function(create, f) {
        return λ.check(id(create, f), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(create, f) {
        return λ.check(composition(create, f), [λ.AnyVal]);
    };
}

function laws(λ) {
    return function(create, f) {
        var x = [   id(create, f),
                    composition(create, f)];
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
        laws: laws
    };
