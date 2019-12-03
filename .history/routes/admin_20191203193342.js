let express = require('express');
let router = express.Router();
let path = require('path');
var moment = require("moment-timezone");
const jwt = require('jsonwebtoken');

const secret = require('../util/config').jwt_secret;

/* GET users listing. */
router.get('/getUsersData', function(req, res, next) {
	let db = req.con;

		let query = `SELECT 
		Id, 
		CONCAT(FirstName, ' ', LastName) AS Name, 
		CASE WHEN IsActive = 1 THEN "Allowed" ELSE "Blocked" END AS Access,
		Email, 
		IsActive, 
		IsNew, 
		CreateDate, 
		IsAdmin 
        FROM user`;
    
    let vals = [];

	db.query(query, vals,function(err,rows){
  	console.log("rowsss", rows)

		if(err){
			console.log("err", err);
        }
        else if(rows.length > 0){
            res.send({'Status': 1, 'Msg': 'Get data successfull.', 'Data': rows});
        } else {
            res.send({'Status': 0, 'Msg': 'Get data failed.', 'Data': []});
            
        }
	});
});

router.post('/changeUserAccess', function(req, res, next) {
	let db = req.con;

        let query = `UPDATE user
        SET IsActive = ?
		WHERE user.Id = ?`;
    
    let vals = [req.body.isActive, req.body.id];
    console.log(vals)

	db.query(query, vals,function(err,rows){
        console.log(rows);
		if(err){
            res.send({'Status': 0, 'Msg': 'Access change failed.', 'Data': []});
        }
        else if(rows.affectedRows == 1){
            res.send({'Status': 1, 'Msg': 'Access change successfull.', 'Data': []});
        } else {
            res.send({'Status': 0, 'Msg': 'Access change failed.', 'Data': []});
        }
	});
});

module.exports = router;
