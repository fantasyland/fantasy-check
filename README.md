# Fantasy Check

![](https://raw.github.com/puffnfresh/fantasy-land/master/logo.png)

## General

QuickCheck is a form of *automated specification testing*. Instead
of manually writing tests cases like so:

```javascript
   assert(0 + 1 == 1);
   assert(1 + 1 == 2);
   assert(3 + 3 == 6);
```

We can just write the assertion algebraically and tell QuickCheck to
automatically generate lots of inputs:

```javascript
   λ.forAll(
       function(n) {
           return n + n == 2 * n;
       },
       [Number]
   ).fold(
       function(fail) {
           return "Failed after " + fail.tries + " tries: " + fail.inputs.toString();
       },
       "All tests passed!",
   )
```

### Laws

Fantasy Check allows the easy testing of various laws whilst being
unit testing framework agnostic.

* [Functors](src/laws/functor.js)
* More to follow...

#### Functors

The functor check has 2 different laws which allow you to test the
mapping of tagged types. Note - it should be possible to test 
functions as well, by providing a map (aka compose) for the function
type.

Assuming you're using [Fantasy Identities](https://github.com/fantasyland/fantasy-identities)
and a adapter from the [adapters package](src/adapters) with the unit
testing framework.

```javascript
exports.law1 = functor.law1(λ)(Identity.of);
exports.law2 = functor.law2(λ)(Identity.of);
```

## Testing

### Library

Fantasy Check uses [nodeunit](https://github.com/caolan/nodeunit) for 
all the tests and because of this there is currently an existing 
[adapter](test/lib/test.js) in the library to help with integration 
between nodeunit and Fantasy Check.

### Coverage

Currently Fantasy Check is using [Istanbul](https://github.com/gotwarlost/istanbul) 
for code coverage analysis; you can run the coverage via the following
command:

_This assumes that you have istanbul installed correctly._

```
istanbul cover nodeunit -- test/*.js
```

It should report that the total coverage is at 100% for the whole lib.