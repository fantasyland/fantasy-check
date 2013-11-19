var Option = require('fantasy-options'),
    helpers = require('fantasy-helpers'),
    environment = require('fantasy-environment'),

    arb = require('./arb'),
    shrink = require('./shrink'),

    Some = Option.Some,
    None = Option.None,

    getInstance = helpers.getInstance;

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
    return args.map(function(arg) {
        return env.arb(arg, size);
    });
}

function findSmallest(env, property, inputs) {
    var shrunken = inputs.map(env.shrink),
        smallest = [].concat(inputs),
        args,
        i, j;

    for (i = 0; i < shrunken.length; i++) {
        args = [].concat(smallest);
        for (j = 0; j < shrunken[i].length; j++) {
            args[i] = shrunken[i][j];
            if (property.apply(this, args))
                break;
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
    var self = getInstance(this, failureReporter);
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
    var inputs,
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
var goal = 100;

//
//  Create a new environment to add the check property to.
//
var check = environment();

check = check
        .envAppend(arb)
        .envAppend(shrink)
    .property('forAll', forAll)
    .property('generateInputs', generateInputs)
    .property('failureReporter', failureReporter)
    .property('findSmallest', findSmallest)
    .property('goal', goal);

if (typeof module != 'undefined')
    module.exports = check;

