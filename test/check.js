'use strict';

const λ = require('../src/adapters/nodeunit');
const isOption = λ.isInstanceOf(λ.Option);
const isSome = (a) => {
    return a.fold(
        λ.constant(true),
        λ.constant(false)
    );
};
const isNone = (a) => {
    return a.fold(
        λ.constant(false),
        λ.constant(true)
    );
};

exports.forAll = {
    'when testing forAll should return correct value': test => {
        const reporter = λ.forAll(
            s => false,
            [String]
        );
        test.ok(isOption(reporter));
        test.done();
    },
    'when testing forAll should return correct option': test => {
        const reporter = λ.forAll(
            s => false,
            [String]
        );
        test.ok(isSome(reporter));
        test.done();
    },
    'when testing forAll with success should return correct value': test => {
        const reporter = λ.forAll(
            s => true,
            [String]
        );
        test.ok(isOption(reporter));
        test.done();
    },
    'when testing forAll with success should return correct option': test => {
        const reporter = λ.forAll(
            s => true,
            [String]
        );
        test.ok(isNone(reporter));
        test.done();
    },
    'when testing forAll with failure should return correct inputs': test => {
        const index = 0;
        const finder = [];
        const reporter = λ.forAll(
                (s) => {
                    if (++index > (this.goal / 2)) {
                        finder.push(s);
                        return false;
                    } else return true;
                },
                [String]
            );
        test.deepEqual(finder, reporter.x.inputs);
        test.done();
    }
};
