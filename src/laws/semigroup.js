var combinators = require('fantasy-combinators'),

    apply = combinators.apply,
    identity = combinators.identity;

function law1(λ) {
    return function(create) {
        return λ.check(
            function(a, b, c) {
                var i = create(a),
                    j = create(b),
                    k = create(c),

                    x = i.concat(j).concat(k),
                    y = i.concat(j.concat(k));
                return x === y;
            },
            [λ.AnyVal, λ.AnyVal, λ.AnyVal]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        associativity: law1
    };