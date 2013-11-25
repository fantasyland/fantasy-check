var λ = require('../../src/adapters/nodeunit'),
    monoid = require('../../src/laws/monoid'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    Sum = require('./../instances/sum'),
    Product = require('./../instances/product');

exports.laws = {
    'All (Monoid) - Sum': monoid.laws(λ)(Sum, identity),
    'leftIdentity (Monoid) - Sum': monoid.leftIdentity(λ)(Sum, identity),
    'rightIdentity (Monoid) - Sum': monoid.rightIdentity(λ)(Sum, identity),
    'associativity (Monoid) - Sum': monoid.associativity(λ)(Sum, identity),

    'All (Monoid) - Product': monoid.laws(λ)(Product, identity),
    'leftIdentity (Monoid) - Product': monoid.leftIdentity(λ)(Product, identity),
    'rightIdentity (Monoid) - Product': monoid.rightIdentity(λ)(Product, identity),
    'associativity (Monoid) - Product': monoid.associativity(λ)(Product, identity)
};
