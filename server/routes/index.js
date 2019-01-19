var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hack Points' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Hack Points' });
});

router.get('/logout', function (req, res, next) {
  res.render('logout', { title: 'Hack Points' });
});


module.exports = router;
