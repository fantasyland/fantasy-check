var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),

    equality = helpers.equality,
    foldLeft = helpers.foldLeft,
    invoke = helpers.invoke,

    integerEnv = helpers.integerEnv,
    tuple3OfEnv = helpers.tuple3OfEnv,

    apply = combinators.apply,
    compose = combinators.compose,
    identity = combinators.identity;

function leftIdentity(type, f) {
    return function(a) {
        var x = type.empty().concat(type.of(a)),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function rightIdentity(type, f) {
    return function(a) {
        var x = type.of(a).concat(type.empty()),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function associativity(type, f) {
    return function(a, b, c) {
        var i = type.of(a),
            j = type.of(b),
            k = type.of(c),

            x = i.concat(j).concat(k),
            y = i.concat(j.concat(k));
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    var _ = integerEnv(λ);
    return function(type, f) {
        return _.check(leftIdentity(type, f), [_.Integer]);
    };
}

function law2(λ) {
    var _ = integerEnv(λ);
    return function(type, f) {
        return _.check(rightIdentity(type, f), [_.Integer]);
    };
}

function law3(λ) {
    var _ = integerEnv(λ);
    return function(type, f) {
        return _.check(associativity(type, f), [_.Integer, _.Integer, _.Integer]);
    };
}

function laws(λ) {
    var _ = compose(tuple3OfEnv)(integerEnv)(λ);
    return function(type, f) {
        var x = [   leftIdentity(type, f),
                    rightIdentity(type, f),
                    associativity(type, f)];
        return _.check(
            function(t) {
                var f = invoke([t._1, t._2, t._3]);
                return foldLeft(x, true, function(a, b) {
                    return a && f(b);
                });
            },
            [_.tuple3Of(_.Integer, _.Integer, _.Integer)]
        );
    };
}

if (typeof module != 'undefined')
    module.exports = {
        leftIdentity: law1,
        rightIdentity: law2,
        associativity: law3,
        laws: laws
    };
