// wiki.js - Wiki route module

var express = require('express');
var router = express.Router();

//home page router
router.get('/', function (req, res) {

	res.send('Wiki home page');

})

// about page route
router.get('/about', function (req, res){
	res.send('About wiki');
})

module.exports = router;
