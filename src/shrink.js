var λ = require('fantasy-world');

//
//  Create a new environment to add the shrink methods to.
//
var shrink = λ.environment();

//
//  ### shrink values
//
//  Shrinks values for utilizing against checking values.
//
//       console.log(λ.shrink([1, 2, 3, 4])); // [[1, 2, 3, 4], [1, 2, 3]]
//
shrink = shrink
	.method('shrink', λ.isArray, function(a) {
        var accum = [[]],
            x = a.length;

        while(x) {
            x = Math.floor(x / 2);
            if (x) accum.push(a.slice(0, a.length - x));
        }

        return accum;
    })
    .method('shrink', λ.isNumber, function(n) {
        var accum = [0],
            x = n;

        while(x) {
            x = x / 2;
            x = x < 0 ? Math.ceil(x) : Math.floor(x);

            if (x) accum.push(n - x);
        }

        return accum;
    })
    .method('shrink', λ.isString, function(s) {
        var accum = [''],
            x = s.length;

        while(x) {
            x = Math.floor(x / 2);

            if (x) accum.push(s.substring(0, s.length - x));
        }

        return accum;
    });

exports = module.exports = shrink;
