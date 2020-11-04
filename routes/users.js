var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.get('/cool/', function(req, res, next) {
  res.send('You are cool');
});*/


//test
/*router.get('/cool/', function(req, res, next) {
  res.render('cool', {title: 'You are cool'});
});*/



module.exports = router;
