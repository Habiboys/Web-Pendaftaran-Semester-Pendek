var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const isLogin = require('../middleware/islogin.middleware');
const profil = require('../controller/lihatprofil')

router.get('/', verifyToken ,profil.lihatprofil);
module.exports = router
