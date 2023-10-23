const expect = require('chai').expect;

const controller = require("../../controllers/user.controller");
const sinon = require("sinon");

describe('Test User Controller', () => {

    let res,
        req = { body: {} },
        next = () => {},
        statusStub,
        jsonStub;

    beforeEach(() => {
        res = {
            status: (val) => {},
            json: (val) => {},
        }

        statusStub = sinon.stub(res, 'status');
        jsonStub = sinon.stub(res, 'json');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create', () => {
        expect(controller).not.equal(null);
    });

    it('should get all users', () => {
        controller.get_all_users(req, res, next);
    })

});