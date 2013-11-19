var combinators = require('fantasy-combinators'),

    compose = combinators.compose,
    identity = combinators.identity,

    foldLeft = function(a, v, f) {
        var i;
        for (i = 0; i < a.length; i++) {
            v = f(v, a[i]);
        }
        return v;
    },
    zipWith = function(a, b) {
        var accum = [],
            total = Math.min(a.length, b.length),
            i;
        for(i = 0; i<total; i++) {
            accum[i] = [a[i], b[i]];
        }
        return accum;
    },
    equality = function(a, b) {
        var x = Object.keys(a),
            y = Object.keys(b);

        return foldLeft(zipWith(x, y), true, function(a, b) {
            return a && b[0] === b[1];
        });
    };

function law1(λ) {
    return function(create) {
        return λ.check(
            function(a) {
                return equality(create(a).map(identity), create(a));
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
        law1: law1,
        law2: law2
    };
