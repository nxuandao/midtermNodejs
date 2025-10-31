const express = require('express');
const exphbs = require('express-handlebars');
var path = require('path');

const app = express();
const port = 3000;

// Cấu hình Handlebars làm view engine
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
const createError = require('http-errors');

app.use(express.static(path.join(__dirname, 'public')));
// Các router
var indexRouter = require('./routes/index');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
app.listen(port, () => console.log(`Frontend app listening on port ${port}!`))