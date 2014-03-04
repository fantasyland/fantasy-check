var λ = require('../../src/adapters/nodeunit'),
    lens = require('../../src/laws/lens'),
    combinators = require('fantasy-combinators'),
    identity = combinators.identity,

    lenses = require('fantasy-lenses'),
    Lens = lenses.Lens;

λ.goal = 1;

exports.laws = {
    'All (Lens)': lens.laws(λ)(Lens.id, identity),
    'Identity (Lens)': lens.identity(λ)(Lens.id, identity),
    'Retention (Lens)': lens.retention(λ)(Lens.id, identity),
    'DoubleSet (Lens)': lens.doubleSet(λ)(Lens.id, identity)
};
