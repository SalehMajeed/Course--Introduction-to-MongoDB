const moongoose = require('mongoose');

moongoose.Promise = global.Promise;

const connect = url => moongoose.connect(url);

module.exports = connect;
