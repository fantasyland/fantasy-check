var λ = require('../../src/adapters/nodeunit'),
    applicative = require('../../src/laws/applicative'),
    daggy = require('daggy'),

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

exports.law1 = {
    'Identity (Applicative)': applicative.identity(λ)(Id)
};

exports.law2 = {
    'Composition (Applicative)': applicative.composition(λ)(Id)
};

exports.law3 = {
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Id)
};

exports.law4 = {
    'Interchange (Applicative)': applicative.interchange(λ)(Id)
};
