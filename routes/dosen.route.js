var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const role= require ('../middleware/checkrole.middleware');

router.use(verifyToken);
// router.use(role('dosen'));

router.get('/dashboard', function(req, res, next) {
  res.render('dosen/dashboard');
});

module.exports = router;
