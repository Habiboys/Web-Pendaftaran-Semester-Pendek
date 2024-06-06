var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()






// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var mhsRouter = require('./routes/mahasiswa.route');
var adminRouter = require('./routes/admin.route');
var dosenRouter = require('./routes/dosen.route');
var authRouter = require('./routes/auth.route');



var app = express();
app.use(flash());

// app.use(publicRoutes);

// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Sesuaikan dengan konfigurasi keamanan Anda
// }));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash());



// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', mhsRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/dosen', dosenRouter);



//pesan
// app.use((req,res,next)=>{
//   res.locals.error = req.flash('error');
//   res.locals.success = req.flash('succes');
//   next();
// });
app.get('*', (req, res) => {
  res.status(404).render('notfound');
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
