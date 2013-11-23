var λ = require('../../src/adapters/nodeunit'),
    functor = require('../../src/laws/functor'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,
    
    Identity = require('fantasy-identities');

exports.laws = {
    'All (Functor)': functor.laws(λ)(Identity.of, identity),
    'Identity (Functor)': functor.identity(λ)(Identity.of, identity),
    'Composition (Functor)': functor.composition(λ)(Identity.of, identity)
};
