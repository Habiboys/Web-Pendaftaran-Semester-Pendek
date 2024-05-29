var express = require('express');
var router = express.Router();
const verifyUser= require ('../middleware/verifyUser.middleware');
const controller = require ('../controller/mhs.controller');
const ubahpassword = require ('../controller/changePassword.controller');



router.get('/', verifyUser('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home');
});
router.get('/home', verifyUser('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home',{title : 'Home' });
});
router.get('/profile', verifyUser('mahasiswa'), controller.view_profile);
router.get('/profile/ubah-password', verifyUser('mahasiswa'), ubahpassword.view_form);
router.post('/profile/ubah-password',verifyUser('mahasiswa'),ubahpassword.changePassword);

// router.get('/notfound', function(req, res, next) {
//   res.render('notfound');
// });

router.get('/tes', function(req, res, next) {
  res.render('dosen/profildosen', { page: "user" });
});
module.exports = router;
