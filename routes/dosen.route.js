var express = require('express');
var router = express.Router();
const verifyUser= require ('../middleware/verifyUser.middleware');
const controller = require ('../controller/dosen.controller');
const ubahpassword = require ('../controller/changePassword.controller');


router.get('/dashboard', verifyUser('dosen'),  controller.dashboard);
router.get('/mata-kuliah', verifyUser('dosen'),  controller.matkul);
router.get('/profile', verifyUser('dosen'), controller.view_profile);
router.get('/profile/ubah-password',  verifyUser('dosen'), ubahpassword.view_form);
router.post('/profile/ubah-password',  verifyUser('dosen'), ubahpassword.changePassword);


module.exports = router;
