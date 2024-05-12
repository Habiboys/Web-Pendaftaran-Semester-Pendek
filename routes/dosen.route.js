var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const role= require ('../middleware/checkrole.middleware');

// router.use(role('dosen'));

router.get('/dashboard', verifyToken, role('dosen') , function(req, res, next) {
  res.render('dosen/dashboard');
});

router.get('/profile', verifyToken, role('dosen') , function(req, res, next) {
  res.render('dosen/profildosen');
});

module.exports = router;
