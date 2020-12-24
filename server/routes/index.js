var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shekhar' });
});

router.post('/register', function(req, res, next) {
	console.log('register', req.body);
	var sql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;
  res.locals.connection.query(sql, function (err, result) {
    if (err) {
    	res.json('error', err)
    }
    else {
    	res.json({'success' : 1, 'message':'record inserted successfully'})
    console.log("1 record inserted");
}
  });
	
});


router.post('/login', function(req, res, next) {
	var sql = `SELECT * FROM users WHERE email ='${req.body.email}' and password ='${req.body.password}'`;
  res.locals.connection.query(sql, function (err, result) {
  	console.log('err', err)
    if (err) {
    	res.json({'message' : 'Wrong username or password'})
    }
    else {
    	res.json({'success' : 1, 'token':'iadshlhhs'})
}
  });

});

router.get('/loginuser', function(req, res, next) {
	if(req.session.user){
  		res.json(req.session.user);
	} else {
		res.json("no user");
	}
});

module.exports = router;
