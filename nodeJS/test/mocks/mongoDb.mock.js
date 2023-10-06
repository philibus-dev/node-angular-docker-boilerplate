exports.users = [
    {
        _id: '1',
        name: 'user1',
        email: 'user1@testing.com'
    },
    {
        _id: '2',
        name: 'user2',
        email: 'user2@testing.com'
    }
]

exports.constructor = () => {
    return {};
}

exports.convertToObjectId = (id) => {
    return {
        _id: id
    }
}

exports.setSchema = (modelName, newSchema) => {
    return {};
}

exports.openConnection = () => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

exports.closeConnection = () => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

exports.save = (saveObject) => {
    return new Promise((resolve, reject) => {
        resolve(saveObject);
    });
}

exports.model = {
    findByIdAndUpdate: (objectId, updateObject) => {
        return {
            lean: () => {
                return new Promise((resolve, reject) => {
                    resolve(updateObject);
                })
            }
        }
    },
    findByIdAndDelete: (objectId) => {
        return {
            lean: () => {
                return new Promise((resolve, reject) => {
                    resolve(objectId);
                });
            }
        }
    },
    find: () => {
        return {
            lean: () => {
                return new Promise((resolve, reject) => {
                    resolve(this.users);
                });
            }
        }
    }
}