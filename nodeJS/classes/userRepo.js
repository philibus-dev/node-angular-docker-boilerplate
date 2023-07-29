const { v4: uuidv4 } = require('uuid'),
    User = require('./user');

const users = [
    { name: 'Charles Francis Xavier', email: 'professor.x@example.com' },
    { name: 'Scott Summers', email: 'cyclops@example.com' },
    { name: 'Robert Louis Drake', email: 'iceman@example.com' },
];

module.exports = class UserRepo {
    users = [];

    constructor() {
        users.forEach((user) => {
            this.addUser(user.name, user.email);
        });
    }

    getAllUsers() {
        return this.users.map((user) => {
            return new User(user.id, user.name, user.email);
        });
    }

    getUser(userId) {
        const foundUser = this.users.find((user) => {
            return user.id === userId;
        });

        if (foundUser) {
            return new User(foundUser.id, foundUser.name, foundUser.email);
        }

        return false;
    }

    getUserIndex(userId) {
        return this.users.findIndex((user) => {
            return user.id === userId;
        });
    }

    addUser(name, email) {
        this.users.push(new User(uuidv4(), name, email));
    }

    editUser(userIdx, userObj) {
        this.users[userIdx] = {
            ...this.users[userIdx].toJSON(),
            name: userObj.name,
            email: userObj.email
        }
    }

    deleteUser(userId) {
        const foundUserIdx = this.users.findIndex((user) => {
            return user.id === userId;
        });

        if (foundUserIdx > -1) {
            this.users.splice(foundUserIdx, 1);
            return true;
        }

        return false;
    }

}