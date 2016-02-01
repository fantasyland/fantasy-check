'use strict';

const {Some, None} = require('fantasy-options');
const {getInstance} = require('fantasy-helpers');
const environment = require('fantasy-environment');

const arb = require('./arb');
const shrink = require('./shrink');
const law = require('./law');

//
//  # QuickCheck
//
//  QuickCheck is a form of *automated specification testing*. Instead
//  of manually writing tests cases like so:
//
//       assert(0 + 1 == 1);
//       assert(1 + 1 == 2);
//       assert(3 + 3 == 6);
//
//  We can just write the assertion algebraically and tell QuickCheck to
//  automatically generate lots of inputs:
//
//       λ.forAll(
//           function(n) {
//               return n + n == 2 * n;
//           },
//           [Number]
//       ).fold(
//           function(fail) {
//               return "Failed after " + fail.tries + " tries: " + fail.inputs.toString();
//           },
//           "All tests passed!",
//       )
//
function generateInputs(env, args, size) {
    return args.map(arg => env.arb(arg, size));
}

function findSmallest(env, property, inputs) {
    let shrunken = inputs.map(env.shrink);
    let smallest = [].concat(inputs);

    for (let i = 0; i < shrunken.length; i++) {
        let args = [].concat(smallest);
        for (let j = 0; j < shrunken[i].length; j++) {
            args[i] = shrunken[i][j];
            if (property.apply(env, args)) {
                break;
            }
            smallest[i] = shrunken[i][j];
        }
    }

    return smallest;
}

//
//  ### failureReporter
//
//  * inputs - the arguments to the property that failed
//  * tries - number of times inputs were tested before Failure
//
function failureReporter(inputs, tries) {
    const self = getInstance(this, failureReporter);
    self.inputs = inputs;
    self.tries = tries;
    return self;
}

//
//  ## forAll(property, args)
//
//  Generates values for each type in `args` using `λ.arb` and
//  then passes them to `property`, a function returning a
//  `Boolean`. Tries `goal` number of times or until Failure.
//
//  Returns an `Option` of a `failureReporter`:
//
//       var reporter = λ.forAll(
//           function(s) {
//               return isPalindrome(s + s.split('').reverse().join(''));
//           },
//           [String]
//       );
//
function forAll(property, args) {
    let inputs,
        i;

    for (i = 0; i < this.goal; i++) {
        inputs = generateInputs(this, args, i);
        if (!property.apply(this, inputs)) {
            return Some(failureReporter(
                findSmallest(this, property, inputs),
                i + 1
            ));
        }
    }

    return None;
}


//
//  ## goal
//
//  The number of Successful inputs necessary to declare the whole
//  property a Success:
//
//       λ.property('goal', 1000);
//
//  Default is `100`.
//
const goal = 100;

//
//  Create a new environment to add the check property to.
//
const check = environment();

module.exports = check
        .envAppend(arb)
        .envAppend(shrink)
    .property('law', law)
    .property('forAll', forAll)
    .property('generateInputs', generateInputs)
    .property('failureReporter', failureReporter)
    .property('findSmallest', findSmallest)
    .property('goal', goal);
