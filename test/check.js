var λ = require('./lib/test');

exports.testingArb = λ.check(
	function(a) {
		return λ.isString(a);
	},
	[λ.Char]
);
