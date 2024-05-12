var express = require('express');
var router = express.Router();
const verifyTokenAndRole= require ('../middleware/verifyTokenAndRole.middleware');
const controller = require ('../controller/dosen.controller');
const ubahpassword = require ('../controller/changePassword.controller');



router.get('/dashboard', verifyTokenAndRole('dosen'), function(req, res, next) {
  res.render('dosen/dashboard');
});



router.get('/profile', verifyTokenAndRole('dosen'), controller.view_profile);

router.get('/profile/ubah-password',  verifyTokenAndRole('dosen'), ubahpassword.view_form);
router.post('/profile/ubah-password',  verifyTokenAndRole('dosen'), ubahpassword.changePassword);


module.exports = router;
