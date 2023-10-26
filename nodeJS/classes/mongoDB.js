const mongoose = require('mongoose');

require('dotenv').config();

module.exports = class MongoDB {

    mongoHost = process.env.MONGO_HOST;
    mongoPort = process.env.MONGO_PORT;
    mongoUser = process.env.MONGO_USERNAME;
    mongoPass = process.env.MONGO_PASSWORD;
    mongoDB = process.env.MONGO_DB;

    mongoose = mongoose;

    url = `mongodb://${this.mongoUser}:${this.mongoPass}@${this.mongoHost}:${this.mongoPort}/${this.mongoDB}?connectTimeoutMS=10000`;

    #model = null;

    constructor(mongooseInj = null) {
        this.mongoose = (mongooseInj) ? mongooseInj : mongoose;
        this.mongoose.set('strictQuery', false);
    }

    get model() {
        return this.#model;
    }

    set model(model) {
        this.#model = model;
    }

    setSchema(modelName, schema) {
        const newSchema = new mongoose.Schema(schema);
        this.#model = this.mongoose.model(modelName, newSchema);
    }

    convertToObjectId(id) {
        return new this.mongoose.Types.ObjectId(id);
    }

    async save(newObject) {
        const saveObj = this.mongoose.models['users'](newObject);

        return new Promise((resolve, reject) => {
            saveObj.save()
                .then((res) => {resolve(res)})
                .catch((err) => {reject(err)});
        })
    }

    async closeConnection() {
        return new Promise((resolve, reject) => {
            this.mongoose.disconnect()
                .then(() => {console.log('db connection closed'); resolve()})
                .catch(err => reject(err));
        });
    }

    async openConnection() {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.url)
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