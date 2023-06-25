const express = require('express'),
      router = express.Router();
const path = require("path");

router.get("", (req, res) => {
  res.redirect(301, '/webapp');
});

/* GET home page. */
router.get(["/webapp", "/webapp/*"], (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/webapp/index.html`));
});

module.exports = router;
