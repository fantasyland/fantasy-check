var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    foldLeft = helpers.foldLeft,

    apply = combinators.apply,
    identity = combinators.identity;

function associativity(create, f) {
    return function(a, b, c) {
        var i = create(a),
            j = create(b),
            k = create(c),

            x = i.concat(j).concat(k),
            y = i.concat(j.concat(k));
        return f(x) === f(y);
    };
}

function law1(λ) {
    return function(create, f) {
        return λ.check(associativity(create, f), [λ.AnyVal, λ.AnyVal, λ.AnyVal]);
    };
}

function laws(λ) {
    return function(create, f) {
        var x = [associativity(create, f)];
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
        associativity: law1,
        laws: laws
    };