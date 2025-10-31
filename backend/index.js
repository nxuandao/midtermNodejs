const express = require('express');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
var path = require('path');
const createError = require('http-errors');


const app = express();
const port = 3001;

// Cấu hình Handlebars làm view engine
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// Các router
var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');
var productsRouter = require('./routes/products');
var reservationRouter = require('./routes/reservation');

app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/products', productsRouter);
app.use('/reservation', reservationRouter);

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

app.listen(port, () => console.log(`Backend rest api listening on port ${port}!`))



