var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const verifyToken= require ('../middleware/validtoken.middleware');




router.get('/login', controller.form);
router.post('/checklogin', controller.checklogin);



router.post('/logout', verifyToken,controller.logout);
module.exports = router;
