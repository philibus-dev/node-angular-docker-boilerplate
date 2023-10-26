const expect = require('chai').expect,
    assert = require('chai').assert;

const MongoDB = require("../../classes/mongoDB");

const mongooseMock = require('../mocks/mongoose.mock');

describe('Test MongoDB Class', () => {

    it('should create', () => {
        expect(new MongoDB()).not.equal(null);
    });

    it('sets and gets model correctly', () => {
        const mongoDB = new MongoDB(mongooseMock);

        mongoDB.model = "testing";

        expect(mongoDB.model).equal("testing");
    });

    it('should create objectId correctly', () => {
        const mongoDB = new MongoDB(mongooseMock);
        const result = mongoDB.convertToObjectId({message: 'testing'});

        expect(result.id.message).equal('testing');
    });

    it('should be able to open a connection', async () => {
        const mongoDB = new MongoDB(mongooseMock);
        const result = await mongoDB.openConnection();
        expect(result).equal(undefined);
    });

    it('should handle open connection error correctly', async () => {
        const mongoDB = new MongoDB(mongooseMock);
        mongoDB.url = "something/rejected";

        try {
            const result = await mongoDB.openConnection();
        } catch(e) {
            expect(e.message).equal('url rejected');
        }
    });

    it('should be able to close a connection', async () => {
        const mongoDB = new MongoDB(mongooseMock);
        const result = await mongoDB.closeConnection();
        expect(result).equal(undefined);
    });

    it('should handle close connection error correctly', async () => {
        const modifiedMock = { ...mongooseMock };

        modifiedMock.disconnect = () => {
            return new Promise((resolve, reject) => {
                reject({message: 'disconnect failed'});
            });
        }
        const mongoDB = new MongoDB(modifiedMock);

        try {
            const result = await mongoDB.closeConnection();
        } catch(e) {
            expect(e.message).equal('disconnect failed');
        }
    });

    it('should handle successful save correctly', async () => {
        const modifiedMock = { ...mongooseMock };

        modifiedMock.models['users'] = (newObject) => {
            return {
                save: () => {
                    return new Promise((resolve, reject) => {
                        resolve('saved');
                    });
                }
            }
        }

        const mongoDB = new MongoDB(modifiedMock);

        const result = await mongoDB.save({name: 'Joe Tester', email: 'tester@testing.com'});

        expect(result).equal('saved');
    });

    it('should handle error save correctly', async () => {
        const modifiedMock = { ...mongooseMock };

        modifiedMock.models['users'] = (newObject) => {
            return {
                save: () => {
                    return new Promise((resolve, reject) => {
                        reject({message: 'failed save'});
                    });
                }
            }
        }

        const mongoDB = new MongoDB(modifiedMock);

        try {
            const result = await mongoDB.save({name: 'Joe Tester', email: 'tester@testing.com'});
        } catch(e) {
            expect(e.message).equal('failed save');
        }
    });

});