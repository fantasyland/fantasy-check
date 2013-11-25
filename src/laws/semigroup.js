var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),

    foldLeft = helpers.foldLeft,
    equality = helpers.equality,
    integerEnv = helpers.integerEnv,

    apply = combinators.apply,
    identity = combinators.identity;

function associativity(create, f) {
    return function(a, b, c) {
        var i = create(a),
            j = create(b),
            k = create(c),

            x = i.concat(j).concat(k),
            y = i.concat(j.concat(k));
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    var _ = integerEnv(λ);
    return function(create, f) {
        return _.check(associativity(create, f), [_.Integer, _.Integer, _.Integer]);
    };
}

function laws(λ) {
    var _ = integerEnv(λ);
    return function(create, f) {
        var x = [associativity(create, f)];
        return _.check(
            function(a, b, c) {
                return foldLeft(x, true, function(v, f) {
                    return v && f(a, b, c);
                });
            },
            [_.Integer, _.Integer, _.Integer]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        associativity: law1,
        laws: laws
    };