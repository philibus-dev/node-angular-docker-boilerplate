const mongoose = require('mongoose');

require('dotenv').config();

module.exports = class MongoDB {

    mongoHost = process.env.MONGO_HOST;
    mongoPort = process.env.MONGO_PORT;
    mongoUser = process.env.MONGO_USERNAME;
    mongoPass = process.env.MONGO_PASSWORD;
    mongoDB = process.env.MONGO_DB;

    url = `mongodb://${this.mongoUser}:${this.mongoPass}@${this.mongoHost}:${this.mongoPort}/${this.mongoDB}?connectTimeoutMS=10000`;

    #model = null;

    constructor() {
        mongoose.set('strictQuery', false);
    }

    get model() {
        return this.#model;
    }

    setSchema(modelName, schema) {
        const newSchema = new mongoose.Schema(schema);
        this.#model = mongoose.model(modelName, newSchema);
    }

    convertToObjectId(id) {
        return new mongoose.Types.ObjectId(id);
    }

    async save(newObject) {
        const saveObj = new this.model(newObject);

        return new Promise((resolve, reject) => {
            saveObj.save()
                .then((res) => {resolve(res)})
                .catch((err) => {reject(err)});
        })
    }

    async closeConnection() {
        return new Promise((resolve, reject) => {
            mongoose.disconnect()
                .then(() => {console.log('db connection closed'); resolve()})
                .catch(err => reject(err));
        });
    }

    async openConnection() {
        return new Promise((resolve, reject) => {
            mongoose.connect(this.url)
                .then(() => {
                    console.log('db connection opened');
                    resolve();
                })
                .catch((e) => {
                    console.error(e);
                    reject(e);
                });
        });
    }

}