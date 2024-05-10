var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');

router.use(verifyToken);

router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard');
});




module.exports = router;
