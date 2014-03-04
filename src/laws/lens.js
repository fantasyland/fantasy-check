var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),
    
    seqs = require('fantasy-seqs'),
    Seq = seqs.Seq,

    equality = helpers.equality,
    apply = combinators.apply,
    id = combinators.identity;

function identity(type, f) {
    return function(a) {
        var store = type().run(a),
            x = store.set(store.get()),
            y = a;
        return equality(f(x), f(y));
    };
}

function retention(type, f) {
    return function(a, b) {
        var x = type().run(type().run(a).set(b)).get(),
            y = b;
        return equality(f(x), f(y));
    };
}

function doubleSet(type, f) {
    return function(a, b, c) {
        var r = type().run(a),
            x = type().run(r.set(b)).set(c),
            y = r.set(c);
        return equality(f(x), f(y));
    };
}

function law1(λ) {
    return function(type, f) {
        return λ.check(identity(type, f), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(type, f) {
        return λ.check(retention(type, f), [λ.AnyVal, λ.AnyVal]);
    };
}

function law3(λ) {
    return function(type, f) {
        return λ.check(doubleSet(type, f), [λ.AnyVal, λ.AnyVal, λ.AnyVal]);
    };
}

function laws(λ) {
    return function(type, f) {
        var x = [   identity(type, f),
                    retention(type, f),
                    doubleSet(type, f)];
        return λ.check(
            function(v) {
                return Seq.fromArray(x).fold(true, function(a, b) {
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
        retention: law2,
        doubleSet: law3,
        laws: laws
    };
