const expect = require('chai').expect;

const controller = require("../../controllers/user.controller");

describe('Test User Controller', () => {

    it('should create', () => {
        expect(controller).not.equal(null);
    });

});