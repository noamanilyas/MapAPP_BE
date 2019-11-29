var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/getData', function(req, res, next) {
	console.log("getData")
  res.sendFile(path.join(__dirname, '/test.csv'));
});

module.exports = router;
