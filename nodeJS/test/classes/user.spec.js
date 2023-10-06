const expect = require('chai').expect;

const User = require("../../classes/user");

describe('Test User Class', () => {

    it('should create', () => {
        expect(new User()).not.equal(null);
    });

});