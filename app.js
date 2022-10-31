var createError = require('http-errors');
var express = require('express');
var path = require('path');
global.__basedir = __dirname;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
const cors = require('cors');
// Import Mongoose
let mongoose = require('mongoose');
// Configure bodyparser to handle post requests

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://127.0.0.1/morita', { useNewUrlParser: true,useUnifiedTopology: true });

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


var customerRouter = require('./routes/users');
let categoryRouter = require('./routes/category');
let activityRouter = require('./routes/activity');
let productRouter = require('./routes/product');
let reviewRouter = require('./routes/reviews');
let messageRouter = require('./routes/messaging');

var app = express();

let baseUrl = '/api/v1/';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.disable('etag');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'uploads')));


app.use(baseUrl+'users/', customerRouter);
app.use(baseUrl+'category/', categoryRouter);
app.use(baseUrl+'activity/', activityRouter);
app.use(baseUrl+'product/',productRouter);
app.use(baseUrl+'review/',reviewRouter);
app.use(baseUrl+'message/',messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.send('Not Found');
});



module.exports = app;
