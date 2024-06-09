var express = require('express');
var router = express.Router();
const verifyUser= require ('../middleware/verifyUser.middleware');
const controller = require ('../controller/mhs.controller');
const ubahpassword = require ('../controller/changePassword.controller');





router.get('/', controller.view_home);
router.get('/home', controller.view_home);
router.get('/mata-kuliah', controller.view_matkul);
router.get('/mata-kuliah/daftar/:id', verifyUser('mahasiswa'),controller.daftarMatkul);
router.post('/mata-kuliah/daftar/:id',verifyUser('mahasiswa'), controller.prosesDaftar);
router.post('/mata-kuliah/daftar/:id/upload',verifyUser('mahasiswa'),controller.uploadFile);

router.get('/profile', verifyUser('mahasiswa'), controller.view_profile);
router.get('/profile/ubah-password', verifyUser('mahasiswa'), ubahpassword.view_form);
router.post('/profile/ubah-password',verifyUser('mahasiswa'),ubahpassword.changePassword);



module.exports = router;
