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

router.post('/login', (req, res, next) => {
    let db = req.con;

		let query = `SELECT Id, 
		CONCAT(FirstName, ' ', LastName) AS Name,
		IsAdmin
		FROM user WHERE Email = ? AND Password = ? AND IsActive = 1`;
    
    let vals = [req.body.email, req.body.password]

	db.query(query, vals,function(err,rows){
		if(err){
			res.status(401).send({'Status': 0, 'Msg': 'Username or password incorrect.', 'Data': []});
		}
		else if(rows.length > 0){
			var resp = {
				name: rows[0].Name,
				id: rows[0].Id,
				admin: rows[0].IsAdmin
			}
			const token = jwt.sign(resp, secret, { expiresIn: '2d'});

			resp['token'] = token

			res.send({'Status': 1, 'Msg': 'Login successfull.', 'Data': resp});
		} else {
			res.status(401).send({'Status': 0, 'Msg': 'Username or password incorrect.', 'Data': []});
				
		}
	});
}); 

router.post('/register', (req, res, next) => {
    let db = req.con;

    let query = `INSERT INTO user
		(FirstName, LastName, Email, Password, CreateDate) 
		VALUES(?, ?, ?, ?)`;

    var createdDate = moment
        .tz(Date.now(), 'America/New_York')
        .format("YYYY-MM-DD HH:mm:ss");

 	let vals = [req.body.firstName, req.body.lastName, req.body.email, req.body.password, createdDate]

	db.query(query, vals,function(err,rows){
		if(err){
			if(err.code == 'ER_DUP_ENTRY') {
				res.send({'Status': 0, 'Msg': 'Registeration failed. Email already exists.', 'Data': []});
			} else {
				res.send({'Status': 0, 'Msg': 'Registeration failed.', 'Data': []});
			}
    }
        else if(rows.affectedRows == 1){
            res.send({'Status': 1, 'Msg': 'Registeration successfull.', 'Data': []});
        } else {
            res.send({'Status': 0, 'Msg': 'Registeration failed.', 'Data': []});
            
        }
	});
}); 

module.exports = router;
