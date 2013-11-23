var combinators = require('fantasy-combinators'),
    helpers = require('./../helpers'),

    foldLeft = helpers.foldLeft,
    equality = helpers.equality,

    apply = combinators.apply,
    identity = combinators.identity,

    Integer = {};

function make(λ) {
    return λ
        .property('Integer', Integer)
        .method('arb',
            function(a) {
                return Integer === a;
            },
            function(a, b) {
                var variance = (Math.pow(2, 32) - 1) / this.goal;
                return this.randomRange(-variance, variance) | 0;
            }
        );
}

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
    var _ = make(λ);
    return function(create, f) {
        return _.check(associativity(create, f), [Integer, Integer, Integer]);
    };
}

function laws(λ) {
    var _ = make(λ);
    return function(create, f) {
        var x = [associativity(create, f)];
        return _.check(
            function(a, b, c) {
                return foldLeft(x, true, function(v, f) {
                    return v && f(a, b, c);
                });
            },
            [Integer, Integer, Integer]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        associativity: law1,
        laws: laws
    };