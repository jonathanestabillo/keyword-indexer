'use strict';

let chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

let db = require('../src/db');

describe('db', () => {
  describe('createDB', () => {
    it('Should return a database object', () => {
      db.createDB().should.not.equal(null);
    });
  });
});