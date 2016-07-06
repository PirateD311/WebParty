var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var sign = require('./routes/sign');
var upload = require('./routes/upload');
var getImage = require('./routes/getImage');
var login = require('./routes/login');
var getDocument = require('./routes/getDocument');
var createParty = require('./routes/createParty');
var queryParty = require('./routes/queryParty');
var attendParty = require('./routes/party/attendParty');
var getParticipants = require('./routes/party/getParticipants');
var editParty = require('./routes/party/editParty');
var disAttendParty = require('./routes/party/disAttendParty');


var app = express();

var G_FUN=require('./DIY_Fun/PirateDB');
var G_Value=require('./DIY_Fun/Global_Value');
var G_FUN_IP=require('./DIY_Fun/G_Ip_Function');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use("/sign",sign);
app.use('/upload',upload);
app.use('/getImage',getImage);
app.use('/login',login);
app.use("/getDocument",getDocument);
app.use("/createParty",createParty);
app.use("/queryParty",queryParty);
app.use("/attendParty",attendParty);
app.use("/getParticipants",getParticipants);
app.use("/editParty",editParty);
app.use("/disAttendParty",disAttendParty);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server=app.listen(3000,function(){
  var host = server.address().address,
      port = server.address().port;
  console.log("Example app listen at http://%s:%s",host,port);
});
module.exports = app;


//ȫ�ַ���������
global.CONEST = "This is conest";
/*���������Ƿ�Ϸ��ķ�����
* pamersΪreq��������������name*/


console.log(IP_VISTORS);

