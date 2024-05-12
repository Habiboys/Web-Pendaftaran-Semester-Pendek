var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');

const role= require ('../middleware/checkrole.middleware');

// router.use(role('admin'));

router.get('/dashboard', verifyToken, role('admin'), function(req, res, next) {
  res.render('admin/dashboard'); 
});

router.get('/profile', verifyToken, role('admin'), function(req, res, next) {
  res.render('admin/profiladmin'); 
});




module.exports = router;
