var λ = require('../../src/adapters/nodeunit'),
    comonad = require('../../src/laws/comonad'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    Identity = require('fantasy-identities');

exports.laws = {
    'All (Comonad)': comonad.laws(λ)(Identity, identity),
    'Identity (Comonad)': comonad.identity(λ)(Identity, identity),
    'Composition (Comonad)': comonad.composition(λ)(Identity, identity),
    'Associativity (Comonad)': comonad.associativity(λ)(Identity, identity)
};
