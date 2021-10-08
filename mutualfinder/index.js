var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var passport = require('passport');


require('./config/passport')(passport);

mongoose.connect('mongodb://localhost/mutualfinder', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to mongodb');
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', function (req, res, next) {
    res.locals.user = req.user || null;
    res.render('index');
    next();
});
var users = require('./routes/users');

app.use('/users', users);

app.listen(3000, function () {
    console.log('server started on port 3000');
});