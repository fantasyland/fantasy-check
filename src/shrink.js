'use strict';

const {isArray, isBoolean, isNumber, isString} = require('fantasy-helpers');
const environment = require('fantasy-environment');

//
//  Create a new environment to add the shrink methods to.
//
const shrink = environment();

//
//  ### shrink values
//
//  Shrinks values for utilizing against checking values.
//
//       console.log(helpers.shrink([1, 2, 3, 4])); // [[1, 2, 3, 4], [1, 2, 3]]
//
module.exports = shrink
    .method('shrink', isArray, a => {
        var accum = [[]],
            x = a.length;

        while(x) {
            x = Math.floor(x / 2);
            if (x) accum.push(a.slice(0, a.length - x));
        }

        return accum;
    })
    .method('shrink', isBoolean, n => {
        return [!n]; 
    })
    .method('shrink', isNumber, n => {
        var accum = [0],
            x = n;

        while(x) {
            x = x / 2;
            x = x < 0 ? Math.ceil(x) : Math.floor(x);

            if (x) accum.push(n - x);
        }

        return accum;
    })
    .method('shrink', isString, s => {
        var accum = [''],
            x = s.length;

        while(x) {
            x = Math.floor(x / 2);

            if (x) accum.push(s.substring(0, s.length - x));
        }

        return accum;
    });
