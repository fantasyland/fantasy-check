var λ = require('../../src/adapters/nodeunit'),
    semigroup = require('../../src/laws/semigroup'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    Sum = require('./../instances/sum'),
    Product = require('./../instances/product');

exports.laws = {
    'All (Semigroup) - Sum': semigroup.laws(λ)(Sum.of, identity),
    'Associativity (Semigroup) - Sum': semigroup.associativity(λ)(Sum.of, identity),

    'All (Semigroup) - Product': semigroup.laws(λ)(Product.of, identity),
    'Associativity (Semigroup) - Product': semigroup.associativity(λ)(Product.of, identity)    
};
