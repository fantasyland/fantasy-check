const check = require('./src/check');
// Adapter
const jasmine = require('./src/adapters/jasmine');
const mocha = require('./src/adapters/mocha');
const nodeunit = require('./src/adapters/nodeunit');
// Law
const applicative = require('./src/laws/applicative');
const comonad = require('./src/laws/comonad');
const functor = require('./src/laws/functor');
const monad = require('./src/laws/monad');
const monoid = require('./src/laws/monoid');
const semigroup = require('./src/laws/semigroup');
// Conform
const conforms = require('./src/conforms');

module.exports = check
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
