var express = require('express');
var router = express.Router();
const controller = require('../controller/admin.controller');
const verifyTokenAndRole= require ('../middleware/verifyTokenAndRole.middleware');
const ubahpassword = require ('../controller/changePassword.controller');





router.get('/dashboard', verifyTokenAndRole('admin') ,function(req, res, next) {
  res.render('admin/dashboard'); 
});

router.get('/profile',  verifyTokenAndRole('admin'), controller.view_profile);

router.get('/profile/ubah-password',  verifyTokenAndRole('admin'), ubahpassword.view_form);
router.post('/profile/ubah-password',  verifyTokenAndRole('admin'), ubahpassword.changePassword);






module.exports = router;
