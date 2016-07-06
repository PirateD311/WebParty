var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers['x-forwarded-for']);
  console.log(req.connection.remoteAddress);
  console.log(req.connection.remoteAddress);
  console.log(req.socket.remoteAddress);
  console.log(req.connection.socket.remoteAddress);
  res.render('index', { title: 'Express' });
});
module.exports = router;
