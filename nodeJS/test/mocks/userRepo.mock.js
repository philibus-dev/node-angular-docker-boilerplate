const users = [
    {
        "name": "Charles Francis Xavier",
        "email": "professor.x@example.com",
        "id": "651f30d47c7ace877a77afae"
    },
    {
        "name": "Scott Summers",
        "email": "cyclops@example.com",
        "id": "651f30d47c7ace877a77afaf"
    },
    {
        "name": "Robert Louis Drake",
        "email": "iceman@example.com",
        "id": "651f30d47c7ace877a77afb0"
    }
]

exports.constructor = () => {
    return {};
}

exports.getAllUsers = () => {
    return users;
}

exports.addUser = (name, email) => {
    if(!name || !email) {
        throw Error("testing");
    }

    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

exports.editUser = (id, userObj) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}