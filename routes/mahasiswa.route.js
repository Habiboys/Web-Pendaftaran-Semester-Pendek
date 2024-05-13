var express = require('express');
var router = express.Router();
const verifyTokenAndRole= require ('../middleware/verifyTokenAndRole.middleware');
const controller = require ('../controller/mhs.controller');
const ubahpassword = require ('../controller/changePassword.controller');


router.get('/', verifyTokenAndRole('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home');
});
router.get('/home', verifyTokenAndRole('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home');
});


router.get('/profile', verifyTokenAndRole('mahasiswa'), controller.view_profile);
router.get('/profile/ubah-password', verifyTokenAndRole('mahasiswa'), ubahpassword.view_form);
router.post('/profile/ubah-password', verifyTokenAndRole('mahasiswa'), ubahpassword.changePassword);

// router.get('/notfound', function(req, res, next) {
//   res.render('notfound');
// });

// router.get('/tes', function(req, res, next) {
//   res.render('layout/admin', { page: "user" });
// });


//
module.exports = router;
