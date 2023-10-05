const expect = require('chai').expect;

const MongoDB = require("../../classes/mongoDB");


describe('Test MongoDB', () => {

    it('should get model', () => {
        const mongoDb = new MongoDB();

        expect(mongoDb.model).equal(null);
    });

});