var foldLeft = function(a, v, f) {
        var i;
        for (i = 0; i < a.length; i++) {
            v = f(v, a[i]);
        }
        return v;
    },
    zipWith = function(a, b) {
        var accum = [],
            total = Math.min(a.length, b.length),
            i;
        for(i = 0; i<total; i++) {
            accum[i] = [a[i], b[i]];
        }
        return accum;
    },
    equality = function(a, b) {
        var x = Object.keys(a),
            y = Object.keys(b);

        return foldLeft(zipWith(x, y), true, function(a, b) {
            return a && b[0] === b[1];
        });
    };

if (typeof module != 'undefined')
    module.exports = equality;
