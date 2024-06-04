var express = require('express');
var router = express.Router();
const controller = require('../controller/admin.controller');
const verifyUser= require ('../middleware/verifyUser.middleware');
const ubahpassword = require ('../controller/changePassword.controller');




router.get('/dashboard', verifyUser('admin') , controller.dashboard); 
router.get('/mata-kuliah', verifyUser('admin') , controller.matkul); 
router.get('/tambah-matkul', verifyUser('admin') , controller.tambahMatkul); 
router.post('/tambah-matkul', verifyUser('admin') , controller.storeMatkul); 
router.get('/edit-matkul/:id',  verifyUser('admin') ,controller.editMatkul);
router.post('/edit-matkul/:id', verifyUser('admin') , controller.updateMatkul);
router.post('/delete-matkul/:id', verifyUser('admin') , controller.deleteMatkul);
router.post('/close-matkul/:id', verifyUser('admin') , controller.tutupMatkul);
router.get('/mata-kuliah-aktif', verifyUser('admin') , controller.matkulaktif); 
router.get('/pendaftar', verifyUser('admin') , controller.pendaftar); 
router.post('/pendaftar/tolak/:studentNim/:subjectId', verifyUser('admin') , controller.tolakPendaftar); 
// router.get('/mahasiswa-aktif', verifyUser('admin') , controller.matkulaktif); 


router.get('/profile',  verifyUser('admin'), controller.view_profile);
router.get('/profile/ubah-password',  verifyUser('admin'), ubahpassword.view_form);
router.post('/profile/ubah-password',  verifyUser('admin'), ubahpassword.changePassword);


module.exports = router;
