'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');

var app = express();

const port = 3001;

/* ========== LOADING ALL MONGOOSE MODELS ========== */

const mongoose = require('mongoose');
const Comment = require('./api/models/Comment');
const Person = require('./api/models/Person');
const Project = require('./api/models/Project');
const Specialization = require('./api/models/Specialization');
const Task = require('./api/models/Task');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://pi2:csstv2018@ds159187.mlab.com:59187/projectdb');
mongoose.connect('mongodb://localhost:27017/Tododb', (err) => {
  if (err) {
    console.error(colors.red(err.message));
    process.exit(-1);
  } else {
    console.log("Successfuly connected to database".green);
  }
});



//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for handling File updates.
var fileUpload = require('./api/routes/filesRoutes');
fileUpload(app);

var mail = require('./api/routes/mailsRoutes');
mail(app);

//var routes = require('./api/routes/todoListRoutes'); //importing route
var project_routes = require('./api/routes/projectRoutes');
project_routes(app); //register the route

var partner_routes = require('./api/routes/partnerRoutes');
partner_routes(app);

var major_routes = require('./api/routes/majorsRoutes');
major_routes(app);

var api_routes = require('./api/routes/adminRoutes');
api_routes(app);

var comments_routes = require('./api/routes/commentsRoute')
comments_routes(app);

app.use('/static', express.static('./.uploads'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log('Server running on port 3001'.green);
});
