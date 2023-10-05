const asyncHandler = require("express-async-handler"),
    path = require("path");

exports.redirect_to_webapp = asyncHandler(async (req, res) => {
    res.redirect(301, '/webapp');
});

exports.send_index_html = asyncHandler(async (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public/webapp/index.html`));
});

exports.handleFourOfour = asyncHandler(async (req, res) => {
    res.status(404);
    res.sendFile(path.join(`${__dirname}/../public/webapp/index.html`));
});
