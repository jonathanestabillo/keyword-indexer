'use strict';
let db = require('diskdb');

// Create DB Connecion
module.exports.createDB = () => {
    db = db.connect(__dirname + '/store', ['keywords']);

    if (db === null) {
        return null;
    } else {
        return db;
    }
};