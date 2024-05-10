var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const role= require ('../middleware/checkrole.middleware');


router.get('/notfound', verifyToken, function(req, res, next) {
  res.render('notfound');
});

// router.use(role('mahasiswa'));

router.get('/home', verifyToken,role('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home');
});

//
module.exports = router;
