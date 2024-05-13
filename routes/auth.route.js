var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const verifyToken= require ('../middleware/validtoken.middleware');
const isLogin = require('../middleware/islogin.middleware');
const passcontroller = require('../controller/ubahpasscontroller');



router.get('/login', controller.form);
router.post('/checklogin', controller.checklogin);
router.post('/logout', verifyToken,controller.logout);
router.post('/changepass', verifyToken, passcontroller.ubahpass);
router.get('/ubahpassword', verifyToken, passcontroller.formchangepass)
module.exports = router;
