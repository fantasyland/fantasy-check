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
