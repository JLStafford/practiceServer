var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/create', function(req, res, next) {
  res.render('createUser');
});

router.post('/create', function(req, res, next) {
  console.log(req.body)
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 4, function(err, hash) {
      knex.raw(`INSERT INTO users (username, password, email, age) values ('${req.body.username}', '${hash}', '${req.body.email}', ${req.body.age})`)
      .then(function() {
        res.render('home');
      });
    });
  } else {
    res.redirect('/create');
  }
});

router.post('/login', function(req, res, next) {
  knex.raw(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then(function(users) {
    bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp) {
      if (resp) {
        res.redirect('/user/:id')
      } else {
        res.render('failedLogin')
      }
    });
  });
});


module.exports = router;
