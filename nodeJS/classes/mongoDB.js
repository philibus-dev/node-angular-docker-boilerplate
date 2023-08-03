const {MongoClient} = require("mongodb"),
    ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

module.exports = class MongoDB {

    mongoHost = process.env.MONGO_HOST;
    mongoPort = process.env.MONGO_PORT;
    mongoUser = process.env.MONGO_USERNAME;
    mongoPass = process.env.MONGO_PASSWORD;
    mongoDB = process.env.MONGO_DB;

    url = `mongodb://${this.mongoUser}:${this.mongoPass}@${this.mongoHost}:${this.mongoPort}/${this.mongoDB}?connectTimeoutMS=10000`;
    client = new MongoClient(this.url);

    #collectionName = '';
    #objectId = '';

    get collectionName() {
        return this.#collectionName;
    }

    set collectionName(collectionName) {
        this.#collectionName = collectionName;
    }

    get objectId() {
        return this.#objectId;
    }

    set objectId(objectId) {
        this.#objectId = objectId;
    }

    convertToObjectId(id) {
        return new ObjectId(id);
    }

    getIdFromObjectId(objectId) {
        return objectId.toHexString();
    }

    async closeConnection() {
        return new Promise((resolve, reject) => {
            this.client.close()
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    async connectClient() {
        return new Promise(async (resolve, reject) => {
            this.client.connect()
                .then(() => {
                    const db = this.client.db(this.mongoDB);
                    resolve(db.collection((this.collectionName)))
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

}