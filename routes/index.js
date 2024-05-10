var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/pp', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET users listing. */
router.get('/p', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
