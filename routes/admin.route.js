var express = require('express');
var router = express.Router();
const controller = require('../controller/admin.controller');
const verifyUser= require ('../middleware/verifyUser.middleware');
const ubahpassword = require ('../controller/changePassword.controller');
const tambahmatkul = require ('../controller/tambahmatkul.controller');



router.get('/dashboard', verifyUser('admin') , controller.dashboard); 
router.get('/mata-kuliah',  verifyUser('admin') , controller.matkul); 
router.get('/tambah-mata-kuliah',  verifyUser('admin') , controller.tambahmatkul); 
router.post('/tambahmatkul',  verifyUser('admin'), tambahmatkul.tambahmatkul);
router.delete('/hapusmatkul/:id',  verifyUser('admin'), tambahmatkul.hapusmatkul);

router.get('/profile',   verifyUser('admin'), controller.view_profile); 
router.get('/profile/ubah-password',   verifyUser('admin'), ubahpassword.view_form);
router.post('/profile/ubah-password',   verifyUser('admin'), ubahpassword.changePassword);


module.exports = router;
