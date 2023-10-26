const expect = require('chai').expect,
    sinon = require('sinon'),
    path = require("path");

const Controller = require("../../controllers/index.controller"),
    controller = new Controller();

describe('Test Index Controller', () => {
    let res,
        req = { body: {} },
        redirectStub,
        sendFileStub,
        statusStub;

    beforeEach(() => {
        res = {
            redirect: () => {},
            sendFile: () => {},
            status: (val) => {}
        }

        redirectStub = sinon.stub(res, 'redirect');
        sendFileStub = sinon.stub(res, 'sendFile');
        statusStub = sinon.stub(res, 'status');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create', () => {
        expect(controller).not.equal(null);
    });

    it('should redirect to webapp', async () => {
        controller.redirect_to_webapp(req, res);

        expect(redirectStub.calledWith(301, '/webapp')).to.be.true;
    });

    it('should send index file', () => {
        controller.send_index_html(req, res);

        expect(sendFileStub.calledWith(path.join(`${__dirname}/../../public/webapp/index.html`))).to.be.true;
    });

    it('should set status to 404 and send index file', () => {
        controller.handleFourOfour(req, res);

        expect(statusStub.calledWith(404)).to.be.true;
        expect(sendFileStub.calledWith(path.join(`${__dirname}/../../public/webapp/index.html`))).to.be.true;
    });

});