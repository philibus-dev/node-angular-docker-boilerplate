const MongoDB = require("./mongoDB"),
    ObjectId = require('mongodb').ObjectId;

module.exports = class UserRepo {
    mongoDb = new MongoDB();

    constructor() {
        this.mongoDb.collectionName = 'users';
    }

    async getAllUsers() {
        return new Promise(async (resolve, reject) => {
            const collection = await this.mongoDb.connectClient();

            await collection.find({}).toArray()
                .then(async response => {
                    await this.mongoDb.closeConnection();

                    resolve(
                        response.map(user =>
                        {
                            const tempUser = {
                                ...user,
                                id: user._id
                            }

                            delete tempUser._id;

                            return tempUser;
                        })
                    );
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject(err);
                });
        });
    }

    async addUser(name, email) {
        return new Promise(async (resolve, reject) => {
            const collection = await this.mongoDb.connectClient();

            await collection.insertOne({name, email})
                .then(async response => {
                    await this.mongoDb.closeConnection();
                    resolve(response);
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject(err);
                });
        });
    }

    async editUser(userId, userObj) {
        let userIdObj;

        try {
            userIdObj = await new ObjectId(userId);
        } catch(err) {
            return {status: 500, err: true, message: err.message};
        }

        return new Promise(async (resolve, reject) => {
            const collection = await this.mongoDb.connectClient();

            await collection.updateOne({_id: userIdObj}, {$set: userObj})
                .then(async response => {
                    await this.mongoDb.closeConnection();

                    if (response.modifiedCount === 0) {
                        resolve({status: 404, err: true, message: 'user not found'});
                    } else {
                        resolve(response);
                    }
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject({status: 500, err: true, message: err});
                });

        });
    }

    async deleteUser(userId) {
        let userIdObj;

        try {
            userIdObj = await new ObjectId(userId);
        } catch(err) {
            return {status: 500, err: true, message: err.message};
        }

        return new Promise(async (resolve, reject) => {
            const collection = await this.mongoDb.connectClient();

            await collection.deleteOne({_id: userIdObj})
                .then(async response => {
                    await this.mongoDb.closeConnection();

                    if (response.deletedCount === 0) {
                        resolve({status: 404, err: true, message: 'user not found'});
                    } else {
                        resolve(response);
                    }
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject(err);
                });
        });
    }

}