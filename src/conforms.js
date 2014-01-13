var daggy = require('daggy'),
    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    seqs = require('fantasy-seqs'),
    tuples = require('fantasy-tuples'),
    environment = require('fantasy-environment'),
    Validation = require('fantasy-validations'),

    compose = combinators.compose,
    constant = combinators.constant,
    identity = combinators.identity,
    isString = helpers.isString,
    isArray = helpers.isArray,

    Seq = seqs.Seq,
    Tuple2 = tuples.Tuple2,

    Check = daggy.tagged('x'),

    conforms = environment(),
    rules = environment(),

    Min = daggy.tagged('x'),
    Max = daggy.tagged('x'),
    MinLength = daggy.tagged('x'),
    MaxLength = daggy.tagged('x'),
    Required = daggy.tagged('x'),
    TypeOf = daggy.tagged('x');

Check.of = function(a) {
    return Check(Tuple2(a, Seq.empty()));
};

Check.prototype.fold = function(f) {
    return f(this.x);
};
Check.prototype.chain = function(f) {
    return this.fold(function(a) {
        return f(a).fold(function(b) {
            // Use a lens here!
            return Check(Tuple2(b._1, a._2.concat(b._2)));
        });
    });
};

Check.prototype.map = function() {
    var m = this;
    return m.chain(function(a) {
        return Check.of(f(a));
    });
};

Check.prototype.when = function(x) {
    var m = this;
    return m.chain(function(a) {
        return Check(Tuple2(a._1, Seq.of(x)));
    });
};

Check.prototype.exec = function() {
    return this.fold(function(a) {
        return a._2.map(function(b) {
            return b.validate(a._1);
        }).reduce(function(x, y) {
            return x.fold(
                function() {
                    return x.ap(y);
                },
                function(z) {
                    return Validation.of(constant(z)).ap(y);
                }
            );
        });
    });
};

Min.prototype.validate = function(a) {
    return a >= this.x ?
        Validation.Success(a) :
        Validation.Failure(['Expected value to be greater than ' + this.x]);
};
Max.prototype.validate = function(a) {
    return a < this.x ?
        Validation.Success(a) :
        Validation.Failure(['Expected value to be less than ' + this.x]);
};
MinLength.prototype.validate = function(a) {
    return a.length >= this.x ?
        Validation.Success(a) :
        Validation.Failure(['Expected length to be greater than ' + this.x]);
};
MaxLength.prototype.validate = function(a) {
    return a.length < this.x ?
        Validation.Success(a) :
        Validation.Failure(['Expected length to be less than ' + this.x]);
};
Required.prototype.validate = function(a) {
    var b = !!a;
    return b === this.x ?
        Validation.Success(a) :
        Validation.Failure(['Expected required value, but received ' + this.x]);
};
TypeOf.prototype.validate = function(a) {
    return typeof a === this.x ?
        Validation.Success(Seq.of(a)) :
        Validation.Failure(['Expected type of ' + this.x]);
};

rules = rules
    .property('Min', Min)
    .property('Max', Max)
    .property('MinLength', MinLength)
    .property('MaxLength', MaxLength)
    .property('Required', Required)
    .property('TypeOf', TypeOf);

conforms = conforms
    .property('Check', Check)
    .property('rules', rules);

if (typeof module != 'undefined')
    module.exports = conforms;
