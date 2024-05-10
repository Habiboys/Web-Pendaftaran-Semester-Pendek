var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');

const role= require ('../middleware/checkrole.middleware');



router.get('/dashboard', verifyToken, role('admin'), function(req, res, next) {
  res.render('admin/dashboard'); 
});




module.exports = router;
