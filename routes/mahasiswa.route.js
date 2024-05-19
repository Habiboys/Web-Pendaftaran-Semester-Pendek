var express = require('express');
var router = express.Router();
const verifyTokenAndRole= require ('../middleware/verifyTokenAndRole.middleware');
const controller = require ('../controller/mhs.controller');
const ubahpassword = require ('../controller/changePassword.controller');
const { body} = require('express-validator');



router.get('/', verifyTokenAndRole('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home');
});
router.get('/home', verifyTokenAndRole('mahasiswa'), function(req, res, next) {
  res.render('mahasiswa/home',{title : 'Home' });
});
router.get('/profile', verifyTokenAndRole('mahasiswa'), controller.view_profile);
router.get('/profile/ubah-password', verifyTokenAndRole('mahasiswa'), ubahpassword.view_form);
router.post('/profile/ubah-password', verifyTokenAndRole('mahasiswa'),[
  body('oldPassword').notEmpty().withMessage('Password lama harus diisi'),
  body('newPassword')
    .notEmpty().withMessage('Password baru harus diisi')
    .isLength({ min: 6 }).withMessage('Password baru harus minimal 6 karakter')
    .matches(/\d/).withMessage('Password baru harus mengandung setidaknya satu angka')
    .matches(/[a-z]/).withMessage('Password baru harus mengandung setidaknya satu huruf kecil')
    .matches(/[A-Z]/).withMessage('Password baru harus mengandung setidaknya satu huruf besar'),
  body('confirmPassword')
    .notEmpty().withMessage('Konfirmasi password harus diisi')
    .custom((value, { req }) => value === req.body.newPassword).withMessage('Konfirmasi password tidak cocok dengan password baru')

],ubahpassword.changePassword);

// router.get('/notfound', function(req, res, next) {
//   res.render('notfound');
// });

router.get('/tes', function(req, res, next) {
  res.render('dosen/profildosen', { page: "user" });
});
module.exports = router;
