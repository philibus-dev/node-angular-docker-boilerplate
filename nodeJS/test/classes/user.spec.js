const expect = require('chai').expect;

const User = require("../../classes/user");

describe('Test User Class', () => {

    it('should create', () => {
        expect(new User()).not.equal(null);
    });

    it('should get user values', () => {
        const testUser = new User('1', 'userName', 'userEmail');

        expect(testUser.id).equal('1');
        expect(testUser.name).equal('userName');
        expect(testUser.email).equal('userEmail');
    });

    it('should return user data in JSON format', () => {
        const testUserJSON = new User('1', 'userName', 'userEmail').toJSON();

        expect(testUserJSON).deep.equal({
            id: '1',
            name: 'userName',
            email: 'userEmail'
        });
    });

});