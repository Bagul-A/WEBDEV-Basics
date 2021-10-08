const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Routes
const userRoute = require('./routes/user');

mongoose.connect('mongodb://localhost:27017/Seen', { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo is Hot!');
    })
    .catch(error => {
        console.log("Something is wrong");
        console.log(error);
    });


//Middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'Your_Secret_Key',
    resave: true,
    saveUninitialized: true
}));

app.use('/user', userRoute);

app.use((req, res, next) => {
    res.json({
        message: 'No Route Found :(',
        redirect: "https://google.com"
    });
});

app.use((error, req, res, next) => {
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;