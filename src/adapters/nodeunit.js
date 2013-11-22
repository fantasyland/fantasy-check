var λ = require('../check'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    options = require('fantasy-options'),
    tuples = require('fantasy-tuples');

//
//  ### findSmallest
//  
//  Finds the smallest value for a async check
//
function findSmallest(env, property, inputs) {
    var shrunken = inputs.map(env.shrink),
        smallest = [].concat(inputs);

    return function(f) {
        var resolve = function(index, num) {
                return function(result) {
                    if (result) {
                        rec(index + 1);
                    } else {
                        smallest[index] = shrunken[index][num];
                        rec(index, num + 1);
                    }
                };
            },
            rec = function(index, num) {
                var resolver;
                if (index < shrunken.length) {
                    args = [].concat(smallest);
                    if (num < shrunken[index].length) {
                        args[index] = shrunken[index][num];
                        resolver = property.apply(env, [resolve(index, num)]);
                        resolver.apply(env, args);
                    } else {
                        rec(index + 1);
                    }
                } else {
                    f(smallest);
                }
            };
        rec(0, 0);
    };
}

λ = λ
  .envConcat({}, combinators)
  .envConcat({}, helpers)
  .envConcat({}, tuples)
  .envConcat({}, {
      Option: options
  })
  
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

          return test;
      };
  })
  .property('async', function(property, args) {
      var env = this,
          resolve = function(index, test) {
              return function(result) {
                  failureReporter(result, inputs, index)(
                      function(x) {
                          x.fold(
                              function(fail) {
                                  test.ok(false, 'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString());
                                  test.done();
                              },
                              function() {
                                  rec(index + 1)(test);
                              }
                          );
                      }
                  );
              };
          },
          failureReporter = function(result, inputs, index) {
              return function(resolve) {
                  if (!result) {
                      findSmallest(env, property, inputs)(
                          function(result) {
                              resolve(
                                  env.Option.Some(
                                      env.failureReporter(
                                          result,
                                          index + 1
                                      )
                                  )
                              );
                          }
                      );
                  } else {
                      resolve(env.Option.None);
                  }
              };
          },
          rec = function(index) {
              return function(test) {
                  var resolver;
                  if (index < env.goal) {
                      inputs = env.generateInputs(env, args, index);
                      resolver = property.apply(env, [resolve(index, test)]);
                      resolver.apply(this, inputs);
                  } else {
                      test.ok(true, 'OK');
                      test.done();
                  }
              };
          };
      return rec(0);
  });

if (typeof module != 'undefined')
    module.exports = λ;
