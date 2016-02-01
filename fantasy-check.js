const check = require('./src/check');
// Adapter
const jasmine = require('./src/adapters/jasmine');
const mocha = require('./src/adapters/mocha');
const nodeunit = require('./src/adapters/nodeunit');

module.exports = check
    .property('adapters', {
        jasmine: jasmine,
        mocha: mocha,
        nodeunit: nodeunit
    });
