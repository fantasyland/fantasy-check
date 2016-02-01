'use strict';

const λ = require('../check');

const helpers = require('fantasy-helpers');
const combinators = require('fantasy-combinators');
const options = require('fantasy-options');
const tuples = require('fantasy-tuples');

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
              fail => {
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
  });
