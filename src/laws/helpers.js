var eq = require('fantasy-equality'),
    tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2,
    Tuple3 = tuples.Tuple3,
    functionLength = require('fantasy-helpers').functionLength,

    seqs = require('fantasy-seqs'),
    Seq = seqs.Seq,

    Integer = {},
    integerEnv = function(λ) {
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
    },
    tuple3Of = function(a, b, c) {
        var self = this.getInstance(this, tuple3Of);
        self.types = Tuple3(a, b, c);
        return self;
    },
    tuple3OfEnv = function(λ) {
        var isTuple3Of = λ.isInstanceOf(tuple3Of);
        return λ
            .property('tuple3Of', tuple3Of)
            .method('arb', isTuple3Of, function(a, b) {
                var types = a.types;
                return Tuple3(
                    this.arb(types._1, b - 1),
                    this.arb(types._2, b - 1),
                    this.arb(types._3, b - 1)
                );
            });
    },

    invoke = function(a) {
        return function(f) {
            var length = functionLength(f);
            return f.apply(null, a.slice(0, length));
        };
    },
    equality = function(a, b) {
        return eq.equals(a, b);
    };

if (typeof module != 'undefined')
    module.exports = {
        integerEnv: integerEnv,
        tuple3OfEnv: tuple3OfEnv,
        equality: equality,
        invoke: invoke
    };
