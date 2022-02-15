const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const { loginSFDX } = require('./src/login');

const app = express();

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.get(
  '/auth/salesforce', async (req,res)=>{
    let user = await loginSFDX('login');
    let renderString = `home`
    if(user.code && user.code == 1){
      renderString = `login`;
      user = `Req Timeout. Please try again`
    }
    res.render(renderString, {
      user: user
    })
  });
app.get(
  '/auth/Salesforcelogout', async (req,res)=>{
    const user = await loginSFDX('logout');
    res.render('login', {
      user: user
    })
  });
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
  res.render('error');
});

module.exports = app;
