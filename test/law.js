'use strict';

const λ = require('../src/adapters/nodeunit');

const Id = require('fantasy-land/id');
const {identity, composition} = require('fantasy-land/laws/functor');

exports.law = {
    'when testing law with `functor.identity` returns correct value': λ.law(identity)(Id.of),
    'when testing law with `functor.composition` returns correct value': λ.law(composition)(Id.of)
};