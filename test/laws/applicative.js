var λ = require('../../src/adapters/nodeunit'),
    applicative = require('../../src/laws/applicative'),
    combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    identity = combinators.identity,

    /* Replace this when we've got fantasy-identities >= 0.0.2 */
    Id = daggy.tagged('x');

Id.of = Id;
Id.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};
Id.prototype.chain = function(f) {
    return f(this.x);
};
Id.prototype.map = function(f) {
    return this.chain(function(a) {
        return Id.of(f(a));
    });
};

exports.laws = {
    'All (Applicative)': applicative.laws(λ)(Id, identity),
    'Identity (Applicative)': applicative.identity(λ)(Id, identity),
    'Composition (Applicative)': applicative.composition(λ)(Id, identity),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Id, identity),
    'Interchange (Applicative)': applicative.interchange(λ)(Id, identity)
};
