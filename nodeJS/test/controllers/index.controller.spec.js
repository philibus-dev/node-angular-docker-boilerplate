const expect = require('chai').expect,
    sinon = require('sinon');

const controller = require("../../controllers/index.controller");

describe('Test Index Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should create', () => {
        expect(controller).not.equal(null);
    });

    it('should redirect to webapp', async () => {
        const mResult = 'success';
        sinon.stub(service, 'create').resolves(mResult);
        const mReq = { body: {} };
        const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
        controller.redirect_to_webapp(mReq, mReply);
        await flushPromises();
        sinon.assert.calledWith(mReply.code, 201);
        sinon.assert.calledWith(mReply.send, 'success');
    });

});