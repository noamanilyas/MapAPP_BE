var express = require('express');
var router = express.Router();
const path = require('path');

var formidable = require('formidable');
var fs = require('fs');

var BooksFilePath = path.resolve(__dirname, '../BookFiles/');
var AudioFilePath = path.resolve(__dirname, '../AudioFiles/');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Home route is working!!');
});

router.get('/getAllBooks', function(req, res, next) {
	var db = req.con;
	db.query('SELECT * FROM book ORDER BY Id DESC', function(err,rows){
		if(err){
			console.log(err);
			res.send({'Status': 0, 'Msg': 'Something went wrong.', 'Data': null});
		} else{
			res.send({'Status': 1, 'Msg': 'Get data successfull.', 'Data': rows});
		} 
	});
});

router.get('/getSpecificBook', function(req, res, next) {
	// res.sendFile(path.join(__dirname+'/N.pdf'));
	console.log(BooksFilePath + req.query.title);
	res.sendFile(BooksFilePath + "\\" + req.query.title);
});

router.get('/getAllArticles', function(req, res, next) {
	var db = req.con;
	db.query('SELECT * FROM article ORDER BY Id DESC', function(err,rows){
		if(err){
			console.log(err);
			res.send({'Status': 0, 'Msg': 'Something went wrong.', 'Data': null});
		} else{
			res.send({'Status': 1, 'Msg': 'Get data successfull.', 'Data': rows});
		} 
	});
});

router.post('/deleteBook', function(req, res, next) {
	
	fs.unlink(BooksFilePath + "\\" + req.body.FileName, (err) =>{
		if (err && err.code == "'ENOENT'") {
            console.log(err);
            res.send({'Status': 0, 'Msg': 'Something went wrong.', 'Data': null});
        } else {

			var db = req.con;
			db.query('DELETE FROM book WHERE Id = ?', [req.body.Id],function(err,rows){
				if(err){
					console.log(err);
					res.send({'Status': 0, 'Msg': 'Something went wrong.', 'Data': null});
				} else{
					res.send({'Status': 1, 'Msg': 'Delete file successfull.', 'Data': null});
				} 
			});
		}
	})
});

router.post('/deleteArticle', function(req, res, next) {

	var db = req.con;
	db.query('DELETE FROM article WHERE Id = ?', [req.body.Id],function(err,rows){
		if(err){
			console.log(err);
			res.send({'Status': 0, 'Msg': 'Something went wrong.', 'Data': null});
		} else{
			res.send({'Status': 1, 'Msg': 'Delete file successfull.', 'Data': null});
		} 
	});
});

module.exports = router;
