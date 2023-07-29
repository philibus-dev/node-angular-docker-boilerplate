module.exports = class User {
    #id;
    #name;
    #email;

    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get name() { return this.#name; }
    set name(name) { this.#name = name; }

    get email() { return this.#email; }
    set email(email) { this.#email = email; }

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }
}
