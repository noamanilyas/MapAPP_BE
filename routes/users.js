let express = require('express');
let router = express.Router();
let path = require('path');

/* GET users listing. */
router.get('/getData', function(req, res, next) {
	console.log("getData")
  res.sendFile(path.join(__dirname, '/test2.txt'));
});

router.post('/login', (req, res, next) => {
    let db = req.con;
	db.query('SELECT Id FROM user WHERE UserName = ? AND Password = ?', [req.body.UserName, req.body.Password],function(err,rows){
		if(err){
			console.log("err", err);
        }
        if(rows.length > 0){
            res.send({'Status': 1, 'Msg': 'Login successfull.', 'Data': rows});
        } else {
            res.send({'Status': 0, 'Msg': 'Username or password incorrect.', 'Data': []});
            
        }
	});
}); 

router.post('/register', (req, res, next) => {
    let db = req.con;

    let query = `INSERT INTO user
		(FirstName, LastName, Email, Password) 
		VALUES(?, ?, ?, ?)`;

    console.log(req.body)

 	let vals = [req.body.firstName, req.body.lastName, req.body.email, req.body.password]

	db.query(query, vals,function(err,rows){
		if(err){
			console.log("err", err);
            if(err.code == 'ER_DUP_ENTRY') {
                res.send({'Status': 0, 'Msg': 'Registeration failed. Email already exists.', 'Data': []});

            }
        }
        else if(rows.length > 0){
            res.send({'Status': 1, 'Msg': 'Registeration successfull.', 'Data': []});
        } else {
            res.send({'Status': 0, 'Msg': 'Registeration failed.', 'Data': []});
            
        }
	});
}); 

module.exports = router;
