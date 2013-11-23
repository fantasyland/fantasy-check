var λ = require('../../src/adapters/nodeunit'),
    applicative = require('../../src/laws/applicative'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    Identity = require('fantasy-identities');

exports.laws = {
    'All (Applicative)': applicative.laws(λ)(Identity, identity),
    'Identity (Applicative)': applicative.identity(λ)(Identity, identity),
    'Composition (Applicative)': applicative.composition(λ)(Identity, identity),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Identity, identity),
    'Interchange (Applicative)': applicative.interchange(λ)(Identity, identity)
};
