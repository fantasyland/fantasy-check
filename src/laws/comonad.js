var combinators = require('fantasy-combinators'),
    helpers = require('./helpers'),
    
    seqs = require('fantasy-seqs'),
    Seq = seqs.Seq,

    equality = helpers.equality,
    apply = combinators.apply,
    constant = combinators.constant,
    id = combinators.identity;

function extract(x) {
    return x.extract();
}

function identity(type, f) {
    return function(a) {
        var b = type.of(a),
            x = b.extend(extract),
            y = type.of(a);
        return equality(f(x), f(y));
    };
}

function composition(type, f) {
    return function(a) {
        var x = type.of(a).extend(id).extract(),
            y = id(type.of(a));
        return equality(f(x), f(y));
    };
}

function associativity(type, f) {
    return function(a) {
        var x = type.of(a).extend(id).extend(extract),
            y = type.of(a).extend(function(x) {
                return x.extend(extract);
            });
        return equality(f(x.extract()), f(y.extract()));
    };
}

function law1(λ) {
    return function(type, f) {
        return λ.check(identity(type, f), [λ.AnyVal]);
    };
}

function law2(λ) {
    return function(type, f) {
        return λ.check(composition(type, f), [λ.AnyVal]);
    };
}

function law3(λ) {
    return function(type, f) {
        return λ.check(associativity(type, f), [λ.AnyVal]);
    };
}

function laws(λ) {
    return function(type, f) {
        var x = [   identity(type, f),
                    composition(type, f),
                    associativity(type, f)];
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
        composition: law2,
        associativity: law3,
        laws: laws
    };
