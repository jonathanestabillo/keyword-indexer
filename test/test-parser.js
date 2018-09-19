'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.should();
const fs = require('fs');
let db = require('../src/db');
const parser = require('../src/parser');

describe('parser', () => {
    describe('exec', () => {
        it('Should have a top5 property', (done) => {
            db = db.createDB();
            const stream = fs.createReadStream(__dirname + '/dummy4.txt', { encoding: 'utf8' });
            
            stream.on('data', data => {
                //console.log(JSON.stringify(parser.exec(data, db)));
                expect(parser.exec(data, db)).to.have.property('top5');
                done();
            });
        });
    });
});