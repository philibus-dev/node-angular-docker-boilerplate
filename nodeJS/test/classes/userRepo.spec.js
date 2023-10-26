const expect = require('chai').expect;

const UserRepo = require("../../classes/userRepo");
const MongoDbMock = require('../mocks/mongoDb.mock');

describe('Test UserRepo Class', () => {

    it('should create', () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.setSchema = () => {
            throw false;
        }

        expect(new UserRepo(modifiedMock)).not.equal(null);
    });

    it('should open connection correctly', async () => {
        const userRepo = new UserRepo(MongoDbMock);

        try {
            const result = await userRepo.openConnection();
            expect(result).equal(undefined);
        } catch(e) {
            console.error(e);
            expect(true).true;
            throw Error;
        }
    });

    it('should handle open connection error correctly', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.openConnection = () => new Promise((resolve, reject) => {
            reject('testing');
        })

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.openConnection();
        } catch(e) {
            expect(e.message).equal('testing');
        }
    });

    it('should get all users', async () => {
        const userRepo = new UserRepo(MongoDbMock);
        let modifiedUsers = [ ...MongoDbMock.users ];

        modifiedUsers = modifiedUsers.map((user) => {
            return {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })

        const result = await userRepo.getAllUsers();

        expect(result).deep.equal(modifiedUsers);
    });

    it('should handle get all users error correctly', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.model = {
            find: () => {
                return {
                    lean: () => {
                        return new Promise((resolve, reject) => {
                            reject('testing');
                        });
                    }
                }
            }
        }

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.getAllUsers();
        } catch(e) {
            expect(e).equal('testing');
        }
    });

    it('should get add user', async () => {
        const userRepo = new UserRepo(MongoDbMock);

        const result = await userRepo.addUser('testName', 'testEmail');

        expect(result).deep.equal({name: 'testName', email: 'testEmail'});
    });

    it('should handle get add user error correctly', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.save = (saveObject) => {
            return new Promise((resolve, reject) => {
                reject('testing');
            });
        }

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.addUser('testName', 'testEmail');
        } catch(e) {
            expect(e).equal('testing');
        }
    });

    it('should edit user', async () => {
        const userRepo = new UserRepo(MongoDbMock);

        const result = await userRepo.editUser('1', {name: 'tester1b', email: 'tester1bemail'});

        expect(result).deep.equal({name: 'tester1b', email: 'tester1bemail'});
    });

    it('should throw 500 if edit user id cant be converted', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.convertToObjectId = () => {
            throw false;
        }

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.editUser('1v', {name: 'tester1b', email: 'tester1bemail'});
            expect(result).equal({
                "status": 500,
                "err": true
            });
        } catch(e) {}

    });

    it('should throw 404 if edit user cant be found', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.model = {
            findByIdAndUpdate: (objectId, updateObject) => {
                return {
                    lean: () => {
                        return new Promise((resolve, reject) => {
                            resolve(null);
                        })
                    }
                }
            }
        };

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.editUser('doesntexist', {name: 'tester1b', email: 'tester1bemail'});
            expect(result).equal({
                "status": 404,
                "err": true,
                "message": "user not found"
            });
        } catch(e) {}

    });

    it('should throw 500 if edit user update fails', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.model = {
            findByIdAndUpdate: (objectId, updateObject) => {
                return {
                    lean: () => {
                        return new Promise((resolve, reject) => {
                            reject('testing');
                        })
                    }
                }
            }
        };

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.editUser('doesntexist', {name: 'tester1b', email: 'tester1bemail'});
        } catch(e) {
            expect(e.message).equal('testing');
        }

    });

    it('should delete user', async () => {
        const userRepo = new UserRepo(MongoDbMock);

        const result = await userRepo.deleteUser('1');

        expect(result).deep.equal({
            "_id": "1"
        });
    });

    it('should throw 500 if delete user id cant be converted', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.convertToObjectId = () => {
            throw false;
        }

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.deleteUser('1v');
            expect(result).equal({
                "status": 500,
                "err": true
            });
        } catch(e) {}

    });

    it('should throw 404 if delete user cant be found', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.model = {
            findByIdAndDelete: (objectId, updateObject) => {
                return {
                    lean: () => {
                        return new Promise((resolve, reject) => {
                            resolve(null);
                        })
                    }
                }
            }
        };

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.deleteUser('doesntexist');
            expect(result).equal({
                "status": 404,
                "err": true,
                "message": "user not found"
            });
        } catch(e) {}

    });

    it('should throw 500 if delete user update fails', async () => {
        const modifiedMock = { ...MongoDbMock };

        modifiedMock.model = {
            findByIdAndDelete: (objectId, updateObject) => {
                return {
                    lean: () => {
                        return new Promise((resolve, reject) => {
                            reject('testing');
                        })
                    }
                }
            }
        };

        const userRepo = new UserRepo(modifiedMock);

        try {
            const result = await userRepo.deleteUser('doesntexist');
        } catch(e) {
            expect(e.message).equal('testing');
        }

    });

});