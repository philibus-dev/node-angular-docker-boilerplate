const {MongoClient} = require("mongodb"),
    ObjectId = require('mongodb').ObjectId,
    {CONNECTION_STRING} = require("../keys/connection_string");


module.exports = class MongoDB {

    url = CONNECTION_STRING;
    client = new MongoClient(this.url);
    dbName = 'boilerplate_application';

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
                    const db = this.client.db(this.dbName);
                    resolve(db.collection((this.collectionName)))
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

}