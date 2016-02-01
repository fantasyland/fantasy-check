'use strict';

const {equals} = require('fantasy-equality');

function law(f) {
    return type => this.check(f(type)(equals), [this.AnyVal]);
}

module.exports = law;