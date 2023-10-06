const objectId = class ObjectId {
    id;

    constructor(id) {
        this.id = id;
    }
}

exports.models = {}

exports.set = (key, value) => {}

exports.model = (modelName, newSchema) => {
    this.models[modelName] = newSchema;
}

exports.Types = {
    ObjectId: objectId
}

exports.connect = (url) => {
    return new Promise((resolve, reject) => {
        if (url.includes('reject')) {
            reject({message: 'url rejected'});
        } else {
            resolve();
        }
    })
}

exports.disconnect = (fail) => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
