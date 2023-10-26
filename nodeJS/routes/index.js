const express = require('express'),
    index_controller = require('../controllers/index.controller'),
    router = express.Router();

router.get("", index_controller.redirect_to_webapp);

/* GET home page. */
router.get(["/webapp", "/webapp/*"], index_controller.send_index_html);

module.exports = router;
