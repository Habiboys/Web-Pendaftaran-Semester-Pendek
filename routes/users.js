var express = require('express');
var router = express.Router();
const controller = require ('../controller/auth.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/tes', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/login', controller.form);

module.exports = router;
