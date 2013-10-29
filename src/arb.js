var λ = require('fantasy-world');

//
//  ## AnyVal
//
//  Sentinel value for when any type of primitive value is needed.
//
var AnyVal = {};

//
//  ## Char
//
//  Sentinel value for when a single character string is needed.
//
var Char = {};

//
//  Create a new environment to add the arb methods to.
//
var arb = λ.environment();

//
//  ### arbitrary values
//
//  Creates an arbitrary value depending on the type.
//
//       console.log(λ.arb(Number)); // Outputs a random number
//
arb = arb
    .property('AnyVal', AnyVal)
    .property('Char', Char)
    .method('arb', λ.strictEquals(AnyVal), function(a, s) {
        var types = [Boolean, Number, String];
        return this.arb(λ.oneOf(types), s - 1);
    })
    .method('arb', λ.strictEquals(Array), function(a, s) {
        return this.arb(λ.arrayOf(AnyVal), s - 1);
    })
    .method('arb', λ.strictEquals(Boolean), function(a, s) {
        return Math.random() < 0.5;
    })
    .method('arb', λ.strictEquals(Char), function(a, s) {
        /* Should consider 127 (DEL) to be quite dangerous? */
        return String.fromCharCode(Math.floor(λ.randomRange(32, 255)));
    })
    .method('arb', λ.isArrayOf, function(a, s) {
        var accum = [],
            length = λ.randomRange(0, s),
            i;

        for(i = 0; i < length; i++) {
            accum.push(this.arb(a.type, s - 1));
        }

        return accum;
    })
    .method('arb', λ.isObjectLike, function(a, s) {
        var o = {},
            i;

        for(i in a.props) {
            o[i] = this.arb(a.props[i], s);
        }

        return o;
    })
    .method('arb', λ.strictEquals(Number), function(a, s) {
        /*
          Divide the Number.MAX_VALUE by the goal, so we don't get
          a Number overflow (worst case Infinity), meaning we can
          add multiple arb(Number) together without issues.
        */
        var variance = Math.pow(2, 53) / this.goal;
        return λ.randomRange(-variance, variance);
    })
    .method('arb', λ.strictEquals(Object), function(a, s) {
        var o = {},
            length = λ.randomRange(0, s),
            i;

        for(i = 0; i < length; i++) {
            o[this.arb(String, s - 1)] = this.arb(AnyVal, s - 1);
        }

        return o;
    })
    .method('arb', λ.strictEquals(String), function(a, s) {
        return this.arb(λ.arrayOf(Char), s - 1).join('');
    });

exports = module.exports = arb;
