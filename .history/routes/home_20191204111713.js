let express = require('express');
let router = express.Router();
let path = require('path');
var moment = require("moment-timezone");
const jwt = require('jsonwebtoken');

const secret = require('../util/config').jwt_secret;

/* GET users listing. */
router.get('/getData', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/test2.txt'));
});

/* GET users listing. */
router.get('/getChaptersData', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/chapter.txt'));
  });

module.exports = router;
