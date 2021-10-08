var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
        console.log(email);
        User.findOne({ email: email }, function (err, user) {
            if (err)
                return done(err);

            if (!user) {
                return done(null, false, { message: 'No user found' });
            }
            console.log(password);
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    return done(err);
                };
                if (!isMatch) {
                    return done(null, false, { message: 'Wrong password.' });
                }
                console.log("Success!");
                return done(null, user);
            });
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}