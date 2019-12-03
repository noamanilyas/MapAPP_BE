let express = require('express');
let router = express.Router();
let path = require('path');
var moment = require("moment-timezone");
const jwt = require('jsonwebtoken');

const secret = require('../util/config').jwt_secret;

/* GET users listing. */
router.get('/getData', function(req, res, next) {
	console.log("getData")
  res.sendFile(path.join(__dirname, '/test2.txt'));
});

module.exports = router;
