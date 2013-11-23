var λ = require('../../src/adapters/nodeunit'),
    semigroup = require('../../src/laws/semigroup'),
    combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    identity = combinators.identity,

    Option = require('fantasy-options');

exports.laws = {
    'All (Semigroup)': semigroup.laws(λ)(Option.of, identity),
    'Associativity (Semigroup)': semigroup.associativity(λ)(Option.of, identity)
};
