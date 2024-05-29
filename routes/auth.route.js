var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const isLogin = require('../middleware/islogin.middleware');



router.get('/login', isLogin, controller.form);
router.post('/login', controller.checklogin);

router.post('/logout', controller.logout);

module.exports = router;
