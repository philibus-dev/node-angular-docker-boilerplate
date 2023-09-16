const request = require('request');

let url;

beforeEach(async () => {
    url = 'http://localhost:8080/api/users/';
});

describe('Test Users', () => {

    it('should get all users', async (done) => {
        request(url, (error, response, body) => {
            done();
        })
    });

});