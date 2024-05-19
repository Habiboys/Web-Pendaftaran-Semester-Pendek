var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const isLogin = require('../middleware/islogin.middleware');
const { body} = require('express-validator');


router.get('/login', isLogin, controller.form);
router.post('/login',[
body('email')
.isEmail().withMessage('Mohon masukkan alamat email yang valid')
.normalizeEmail(),
], controller.checklogin);

router.post('/logout', controller.logout);

module.exports = router;
