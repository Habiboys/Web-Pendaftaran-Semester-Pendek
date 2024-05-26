var express = require('express');
var router = express.Router();
const controller = require('../controller/admin.controller');
const verifyTokenAndRole= require ('../middleware/verifyTokenAndRole.middleware');
const ubahpassword = require ('../controller/changePassword.controller');
const tambahmatkul = require ('../controller/tambahmatkul.controller');



router.get('/dashboard', verifyTokenAndRole('admin') , controller.dashboard); 
router.get('/mata-kuliah', verifyTokenAndRole('admin') , controller.matkul); 
router.get('/tambah-mata-kuliah', verifyTokenAndRole('admin') , controller.tambahmatkul); 
router.post('/tambahmatkul', verifyTokenAndRole('admin'), tambahmatkul.tambahmatkul);
router.delete('/hapusmatkul/:id', verifyTokenAndRole('admin'), tambahmatkul.hapusmatkul);

router.get('/profile',  verifyTokenAndRole('admin'), controller.view_profile); 
router.get('/profile/ubah-password',  verifyTokenAndRole('admin'), ubahpassword.view_form);
router.post('/profile/ubah-password',  verifyTokenAndRole('admin'), ubahpassword.changePassword);


module.exports = router;
