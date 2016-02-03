'use strict';

function law(f) {
    return type => this.check(f(type)(this.equals), [this.AnyVal]);
}

module.exports = law;