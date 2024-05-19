var express = require('express');
var router = express.Router();
const controller = require ('../controller/auth.controller')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/tes', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', controller.form);

module.exports = router;
