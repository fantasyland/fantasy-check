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