const asyncHandler = require("express-async-handler"),
    path = require("path");

module.exports = class IndexController {

    constructor() {}

    redirect_to_webapp = asyncHandler(async (req, res) => {
        res.redirect(301, '/webapp');
    });

    send_index_html = asyncHandler(async (req, res) => {
        res.sendFile(path.join(`${__dirname}/../public/webapp/index.html`));
    });

    handleFourOfour = asyncHandler(async (req, res) => {
        res.status(404);
        res.sendFile(path.join(`${__dirname}/../public/webapp/index.html`));
    });

}


