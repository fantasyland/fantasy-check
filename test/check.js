var λ = require('./lib/test'),
    isOption = function(a) {
        return λ.isInstanceOf(λ.Option);
    },
    isSome = function(a) {
        return a.fold(
            λ.constant(true),
            λ.constant(false)
        );
    },
    isNone = function(a) {
        return a.fold(
            λ.constant(false),
            λ.constant(true)
        );
    };

exports.forAll = {
    'when testing forAll should return correct value': function(test) {
        var reporter = λ.forAll(
            function(s) {
                return false;
            },
            [String]
        );
        test.ok(isOption(reporter));
        test.done();
    },
    'when testing forAll should return correct option': function(test) {
        var reporter = λ.forAll(
            function(s) {
                return false;
            },
            [String]
        );
        test.ok(isSome(reporter));
        test.done();
    },
    'when testing forAll with success should return correct value': function(test) {
        var reporter = λ.forAll(
            function(s) {
                return true;
            },
            [String]
        );
        test.ok(isOption(reporter));
        test.done();
    },
    'when testing forAll with success should return correct option': function(test) {
        var reporter = λ.forAll(
            function(s) {
                return true;
            },
            [String]
        );
        test.ok(isNone(reporter));
        test.done();
    },
    'when testing forAll with failure should return correct inputs': function(test) {
        var index = 0,
            finder = [],
            reporter = λ.forAll(
                function(s) {
                    if (++index > (this.goal / 2)) {
                        finder.push(s);
                        return false;
                    }
                    return true;
                },
                [String]
            );
        test.deepEqual(finder, reporter.x.inputs);
        test.done();
    }
};