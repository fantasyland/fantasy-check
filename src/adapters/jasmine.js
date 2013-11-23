var λ = require('../check'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    options = require('fantasy-options'),
    tuples = require('fantasy-tuples');

λ = λ
  .envConcat({}, combinators)
  .envConcat({}, helpers)
  .envConcat({}, tuples)
  .envConcat({}, {
      Option: options
  })
  
  .property('check', function(property, args) {
      var env = this;
      return function() {
          var report = env.forAll(property, args),
              result = report.fold(
                  function(fail) {
                      return 'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString();
                  },
                  function() {
                      return 'OK';
                  }
              );

          expect(result).toBe('OK');
      };
  });

if (typeof module != 'undefined')
    module.exports = λ;
