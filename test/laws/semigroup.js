var λ = require('../../src/adapters/nodeunit'),
    semigroup = require('../../src/laws/semigroup'),
    daggy = require('daggy'),

    List = daggy.taggedSum({
        Cons: ['car', 'cdr'],
        Nil: []
    });

List.of = function(x) {
	return List.Cons(x, List.Nil);
};

List.Nil.isNonEmpty = false;

List.Cons.prototype.isNonEmpty = true;

List.prototype.concat = function(a) {
	// Use trampoline here.
	var result = this,
		p = a.cdr;
	while(p.isNonEmpty) {
		result = List.Cons(p.car, result);
		p = p.cdr;
	}
	return result;
};

exports.laws = {
    'All (Semigroup)': semigroup.laws(λ)(List.of),
    'Associativity (Semigroup)': semigroup.associativity(λ)(List.of)
};
