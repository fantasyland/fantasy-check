'use strict';

const λ = require('../check');

const helpers = require('fantasy-helpers');
const combinators = require('fantasy-combinators');
const options = require('fantasy-options');
const tuples = require('fantasy-tuples');

//
//  ### findSmallest
//  
//  Finds the smallest value for a async check
//
function findSmallest(env, property, inputs) {
    const shrunken = inputs.map(env.shrink);
    const smallest = [].concat(inputs);

    return f => {
        const modify = (index, num) => {
            smallest[index] = shrunken[index][num];
            go(index, num + 1);
        };
        const resolve = (index, num) => {
            return result => (result) ? go(index + 1) : modify(index, num);
        };
        const go = function(index, num) {
            var resolver;
            if (index < shrunken.length) {
                args = [].concat(smallest);
                if (num < shrunken[index].length) {
                    args[index] = shrunken[index][num];
                    resolver = property.apply(env, [resolve(index, num)]);
                    resolver.apply(env, args);
                } else {
                    go(index + 1);
                }
            } else f(smallest);
        };
        go(0, 0);
    };
}

module.exports = λ
  .envConcat({}, combinators)
  .envConcat({}, helpers)
  .envConcat({}, tuples)
  .envConcat({}, {
      Option: options
  })
  
  .property('check', function(property, args) {
      return test => {
          const report = this.forAll(property, args);
          const result = report.fold(
              (fail) => {
                  return this.Tuple2(
                      false,
                      'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString()
                  );
              },
              () => this.Tuple2(true, 'OK')
          );

          test.ok(result._1, result._2);
          test.done();

          return test;
      };
  })
  .property('async', function(property, args) {
      const resolve = (index, test) => {
          return result => {
              failureReporter(result, inputs, index)(
                  x => x.fold(
                      fail => {
                          test.ok(false, 'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString());
                          test.done();
                      },
                      () => rec(index + 1)(test)
                  );
              );
          };
      };
      const failureReporter = (result, inputs, index) => {
          return resolve => {
              if (!result) {
                  findSmallest(this, property, inputs)(
                      result => {
                          resolve(this.Option.Some(this.failureReporter(result, index + 1)));
                      }
                  );
              } else resolve(this.Option.None);
          };
      };
      const go = index => {
          return test => {
              if (index < this.goal) {
                  const inputs = this.generateInputs(this, args, index);
                  const resolver = property.apply(this, [resolve(index, test)]);
                  resolver.apply(this, inputs);
              } else {
                  test.ok(true, 'OK');
                  test.done();
              }
          };
      };
      return go(0);
  });
