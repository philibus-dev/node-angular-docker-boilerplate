print('START MONGO INIT #################################################################');

db = db.getSiblingDB('boilerplate_application');

db.createUser(
    {
        user: 'admin',
        pwd: 'admin',
        roles: [{ role: 'readWrite', db: 'boilerplate_application' }],
    },
);

db.createCollection('users');
db.users.insert({ name: 'Charles Francis Xavier', email: 'professor.x@example.com' });
db.users.insert({ name: 'Scott Summers', email: 'cyclops@example.com' });
db.users.insert({ name: 'Robert Louis Drake', email: 'iceman@example.com' });

print('END MONGO INIT #################################################################');
