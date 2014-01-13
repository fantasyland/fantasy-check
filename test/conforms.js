var λ = require('../src/adapters/nodeunit'),

    Check = λ.Check,
    rules = λ.rules,
    constant = λ.constant;

exports.conforms = {
    'should report correct value': function(test) {
        var a = Check.of('a')
            .when(rules.MinLength(1))
            .when(rules.MaxLength(10))
            .when(rules.Required(true))
            .exec();
        test.equal(a.s, 'a');
        test.done();
    },
    'should report first incorrect value': function(test) {
        var a = Check.of('a')
            .when(rules.MinLength(10))
            .when(rules.MaxLength(10))
            .when(rules.Required(true))
            .exec();
        test.deepEqual(a.f, ['Expected length to be greater than 10']);
        test.done();
    },
    'should report first and second incorrect value': function(test) {
        var a = Check.of('a')
            .when(rules.MinLength(10))
            .when(rules.MaxLength(0))
            .when(rules.Required(true))
            .exec();
        test.deepEqual(a.f, [
            'Expected length to be greater than 10',
            'Expected length to be less than 0'
        ]);
        test.done();
    },
    'should report first, second and third incorrect value': function(test) {
        var a = Check.of('a')
            .when(rules.MinLength(10))
            .when(rules.MaxLength(0))
            .when(rules.Required(false))
            .exec();
        test.deepEqual(a.f, [
            'Expected length to be greater than 10',
            'Expected length to be less than 0',
            'Expected required value, but received false'
        ]);
        test.done();
    },
    'when testing conformation of a array': λ.check(
        function(a) {
            return Check.of(a)
                .when(rules.TypeOf('object'))
                .when(rules.MinLength(0))
                .when(rules.MaxLength(λ.goal))
                .when(rules.Required(true))
                .exec()
                .fold(
                    constant(false),
                    constant(true)
                );
        },
        [λ.arrayOf(Number)]
    ),
    'when testing conformation of a number': λ.check(
        function(a) {
            return Check.of(a)
                .when(rules.TypeOf('number'))
                .when(rules.Min(-Math.pow(2, 53)))
                .when(rules.Max(Math.pow(2, 53)))
                .exec()
                .fold(
                    constant(false),
                    constant(true)
                );
        },
        [Number]
    ),
    'when testing conformation of a string': λ.check(
        function(a) {
            return Check.of(a)
                .when(rules.TypeOf('string'))
                .when(rules.MinLength(0))
                .when(rules.MaxLength(λ.goal))
                .exec()
                .fold(
                    constant(false),
                    constant(true)
                );
        },
        [String]
    )
};
