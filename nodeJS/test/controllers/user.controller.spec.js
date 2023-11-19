const expect = require('chai').expect;

const Controller = require("../../controllers/user.controller"),
    UserRepo = require('../mocks/userRepo.mock')
    controller = new Controller(UserRepo);

const sinon = require("sinon");

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

describe('Test User Controller', () => {

    let res,
        req,
        next,
        statusStub,
        jsonStub;

    const origGetAllUsers = controller.userRepo.getAllUsers;

    beforeEach(() => {
        res = {
            status: (val) => {},
            json: (val) => {},
        };
        req = { body: {} };
        next = () => {};

        statusStub = sinon.stub(res, 'status');
        jsonStub = sinon.stub(res, 'json');

        controller.userRepo.getAllUsers = origGetAllUsers;
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create', () => {
        const tstController = new Controller();
        expect(tstController).not.equal(null);
    });

    it('should get all users correctly', async () => {
        await controller.get_all_users(req, res);

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith(users)).to.be.true;
    });

    it('should handle getting all users errors', async () => {
        controller.userRepo.getAllUsers = () => {
            return false;
        }

        await controller.get_all_users(req, res);

        expect(statusStub.calledWith(500)).to.be.true;
        expect(jsonStub.called).to.be.true;

        sinon.restore();

        controller.userRepo.getAllUsers = () => {
            throw Error("testing");
        }

        await controller.get_all_users(req, res);

        expect(statusStub.calledWith(500)).to.be.true;
        expect(jsonStub.called).to.be.true;
    });

    it('should get current user correctly', async () => {
        req = {
            ...req,
            oidc: {
                user: {name: 'test'}
            }
        }

        await controller.get_curr_user(req, res);

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({name: 'test'})).to.be.true;
    });

    it('should return 401 if user cant be found', async () => {
        req = {
            ...req,
            oidc: {}
        }

        await controller.get_curr_user(req, res);

        expect(statusStub.calledWith(401)).to.be.true;
        expect(jsonStub.calledWith({message: 'User is not authenticated!'})).to.be.true;
    });

    it('should create user correctly', async () => {
        req = {
            body: {
                name: 'joe tester',
                email: 'jtester@testing.com'
            }
        }

        await controller.create_user(req, res);

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({ message: 'New user created.', users })).to.be.true;
    });

    it('create user handles errors correctly', async () => {
        req = {
            body: {}
        }

        await controller.create_user(req, res);

        expect(statusStub.calledWith(400)).to.be.true;
        expect(jsonStub.called).to.be.true;

        controller.userRepo.addUser = (name, email) => {
            return new Promise((resolve, reject) => {
                reject("testing");
            })
        };

        req = {
            body: {
                name: 'joe tester',
                email: 'jtester@testing.com'
            }
        }

        await controller.create_user(req, res);

        expect(statusStub.secondCall.calledWith(500)).to.be.true;
        expect(jsonStub.called).to.be.true;
    });

    it('should update user correctly', async () => {
        req = {
            params: {
                id: '123'
            },
            body: {
                name: 'joe tester',
                email: 'jtester@testing.com'
            }
        }

        await controller.update_user(req, res);

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({ message: 'User updated', users })).to.be.true;
    });

    it('update user handles errors correctly', async () => {
        req = {
            params: {
                id: false
            },
            body: {}
        }

        await controller.update_user(req, res);

        expect(statusStub.calledWith(400)).to.be.true;
        expect(jsonStub.called).to.be.true;

        controller.userRepo.editUser = (id, userObj) => {
            return new Promise((resolve, reject) => {
                resolve({ err: {}, status: 500, message: 'testing' });
            })
        };

        req = {
            params: {
                id: '123'
            },
            body: {
                name: 'joe tester',
                email: 'jtester@testing.com'
            }
        }

        await controller.update_user(req, res);

        expect(statusStub.secondCall.calledWith(500)).to.be.true;
        expect(jsonStub.called).to.be.true;
    });

    it('should delete user correctly', async () => {
        req = {
            params: {
                id: '123'
            }
        }

        await controller.delete_user(req, res);

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({ message: 'User 123 deleted successfully.', users })).to.be.true;
    });

    it('delete user handles errors correctly', async () => {
        req = {
            params: {
                id: false
            },
            body: {}
        }

        await controller.delete_user(req, res);

        expect(statusStub.calledWith(404)).to.be.true;
        expect(jsonStub.calledWith({ message: `You must specify an id for deletion` })).to.be.true;

        controller.userRepo.deleteUser = (id) => {
            return new Promise((resolve, reject) => {
                resolve({ err: {}, status: 500, message: 'testing' });
            })
        };

        req = {
            params: {
                id: '123'
            }
        }

        await controller.delete_user(req, res);

        expect(statusStub.secondCall.calledWith(500)).to.be.true;
        expect(jsonStub.called).to.be.true;
    });

});