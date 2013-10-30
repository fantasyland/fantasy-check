var λ = require('../../fantasy-check'),
    helpers = require('fantasy-helpers'),
    C = require('fantasy-combinators'),
    options = require('fantasy-options'),
    tuples = require('fantasy-tuples');

λ = λ
  .envConcat({}, helpers)
  .envConcat({}, C)
  .envConcat({}, {
      Option: options
  })
  .envConcat({}, tuples)
  .property('check', function(property, args) {
      var env = this;
      return function(test) {
          var report = env.forAll(property, args),
              result = report.fold(
                  function(fail) {
                      return env.Tuple2(
                          false,
                          'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString()
                      );
                  },
                  function() {
                      return env.Tuple2(
                          true,
                          'OK'
                      );
                  }
              );

          test.ok(result._1, result._2);
          test.done();
      };
  });

exports = module.exports = λ;
