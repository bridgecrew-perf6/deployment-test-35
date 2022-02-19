const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');
const authlogoutRouter = require('./routes/authlogout');
const installRouter =require('./routes/install');
const oauth2Router = require('./routes/jsforce');
const oauth2CallbackRouter = require('./routes/callback')
const app = express();
const oneDay = 1000 * 60 * 60 * 24;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// view engine setup
nunjucks.configure('./views/', {
  autoescape: true,
  express: app,
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/auth/salesforce', authRouter)
app.use('/auth/salesforcelogout', authlogoutRouter)
app.use('/install', installRouter);
app.use('/oauth2/auth', oauth2Router);
app.use('/oauth2/success', oauth2CallbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(express.urlencoded({
  extended: true
}))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
