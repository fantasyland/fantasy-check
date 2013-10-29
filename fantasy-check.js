var check = require('./src/check'),
    fantasy = require('fantasy-world');

exports = module.exports = fantasy.envAppend(check);
