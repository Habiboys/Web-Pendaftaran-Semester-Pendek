var express = require('express');
var router = express.Router();
const isLogin = require('../middleware/islogin.middleware');
const controller = require('../controller/auth.controller');
const mhs = require('../controller/mhs.controller');
const verifyUser= require ('../middleware/verifyUser.middleware');



router.get('/login', isLogin, controller.form);
router.post('/login', controller.checklogin);

router.post('/logout', controller.logout);
router.get('/beams',  mhs.authBeam);

module.exports = router;
