var check = require('./src/check'),
    // Adapters
    jasmine = require('./src/adapters/jasmine'),
    mocha = require('./src/adapters/mocha'),
    nodeunit = require('./src/adapters/nodeunit'),
    // Laws
    applicative = require('./src/laws/applicative'),
    comonad = require('./src/laws/comonad'),
    functor = require('./src/laws/functor'),
    monad = require('./src/laws/monad'),
    monoid = require('./src/laws/monoid'),
    semigroup = require('./src/laws/semigroup'),
    // Conforms
    conforms = require('./src/conforms');

λ = check
    .property('adapters', {
        jasmine: jasmine,
        mocha: mocha,
        nodeunit: nodeunit
    })
    .property('laws', {
        applicative: applicative,
        comonad: comonad,
        functor: functor,
        monad: monad,
        monoid: monoid,
        semigroup: semigroup
    });

if (typeof module != 'undefined')
    module.exports = λ;
