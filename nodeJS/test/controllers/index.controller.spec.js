const expect = require('chai').expect;

const controller = require("../../controllers/index.controller");

describe('Test Index Controller', () => {

    it('should create', () => {
        expect(controller).not.equal(null);
    });

});