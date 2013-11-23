var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    foldLeft = helpers.foldLeft,
    equality = helpers.equality,

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
    return function(create, f) {
        return λ.check(associativity(create, f), [String, String, String]);
    };
}

function laws(λ) {
    return function(create, f) {
        var x = [associativity(create, f)];
        return λ.check(
            function(a, b, c) {
                return foldLeft(x, true, function(v, f) {
                    return v && f(a, b, c);
                });
            },
            [String, String, String]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        associativity: law1,
        laws: laws
    };