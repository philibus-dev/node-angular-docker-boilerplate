const MongoDB = require("./mongoDB");

module.exports = class UserRepo {
    mongoDb;

    constructor(mongoDbInj = null) {
        this.mongoDb = (mongoDbInj) ? mongoDbInj : new MongoDB();

        const userSchema = {
            name: String,
            email: String
        }

        try {
            this.mongoDb.setSchema('users', userSchema);
        } catch(e) {
            console.error(e);
        }

    }

    async openConnection() {
        try {
            await this.mongoDb.openConnection()
        } catch(e) {
            console.error(e);
            throw new Error(e);
        }
    }

    async getAllUsers() {
        await this.openConnection();

        return new Promise(async (resolve, reject) => {
            this.mongoDb.model.find().lean()
                .then(async (res) => {
                    await this.mongoDb.closeConnection();

                    resolve(
                        res.map(user => {
                            const tempUser = {
                                ...user,
                                id: user._id
                            }

                            delete tempUser._id;

                            return tempUser;
                        })
                    );
                })
                .catch(async (err) => {
                    await this.mongoDb.closeConnection();
                    reject(err)
                });
        });
    }

    async addUser(name, email) {
        await this.openConnection();

        return new Promise(async (resolve, reject) => {
            this.mongoDb.save({name, email})
                .then(async (res) => {
                    await this.mongoDb.closeConnection();
                    resolve(res);
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject(err);
                });
        });
    }

    async editUser(userId, userObj) {
        await this.openConnection();

        let userIdObj;

        try {
            userIdObj = this.mongoDb.convertToObjectId(userId);
        } catch(err) {
            return {status: 500, err: true, message: err.message};
        }

        return new Promise(async (resolve, reject) => {
            this.mongoDb.model.findByIdAndUpdate(userIdObj, userObj).lean()
                .then(async (res) => {
                    await this.mongoDb.closeConnection();

                    if (res) {
                        resolve(res);
                    } else {
                        resolve({status: 404, err: true, message: 'user not found'});
                    }
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject({status: 500, err: true, message: err});
                });
        });
    }

    async deleteUser(userId) {

        await this.openConnection();

        let userIdObj;

        try {
            userIdObj = this.mongoDb.convertToObjectId(userId);
        } catch(err) {
            return {status: 500, err: true, message: err.message};
        }

        return new Promise(async (resolve, reject) => {
            this.mongoDb.model.findByIdAndDelete(userIdObj).lean()
                .then(async (res) => {
                    await this.mongoDb.closeConnection();

                    if (res) {
                        resolve(res);
                    } else {
                        resolve({status: 404, err: true, message: 'user not found'});
                    }
                })
                .catch(async err => {
                    await this.mongoDb.closeConnection();
                    reject({status: 500, err: true, message: err});
                });
        });
    }

}