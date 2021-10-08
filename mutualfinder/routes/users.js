var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
router.use(express.static(__dirname + '/public'));

router.get('/register', function (req, res) {

    res.render('register', {
        title: 'Register'
    });
});

router.post('/register', async function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    var Name = req.body.Name;
    //var gender = req.body.gender;
    var caste = req.body.caste;
    var department = req.body.department;
    var designation = req.body.designation;
    var salary = req.body.salary;
    var desc = req.body.desc;
    var email = req.body.Email;
    var password = req.body.Password;
    var Zone1 = req.body.Zone1;
    var Div1 = req.body.Div1;
    var Hq1 = req.body.Hq1;
    var Zone2 = req.body.Zone2;
    var Div2 = req.body.Div2;
    var Hq2 = req.body.Hq2;
    password = await bcrypt.hash(password, 12);
    User.findOne({ email: email }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.redirect('/users/register');
        } else {
            var user = new User({
                Name: Name,
                //gender: gender,
                caste: caste,
                department: department,
                designation: designation,
                salary: salary,
                desc: desc,
                email: email,
                password: password,
                Zone1: Zone1,
                Div1: Div1,
                Hq1: Hq1,
                Zone2: Zone2,
                Div2: Div2,
                Hq2: Hq2,
                image: imageFile
            });

            user.save(function (err) {
                if (err)
                    return console.log(err);

                if (imageFile !== "") {
                    var userImage = req.files.image;
                    var path = 'public/user_images/' + imageFile;

                    userImage.mv(path, function (err) {
                        return console.log(err);
                    });
                }
            });
            return res.json({
                message: `User ${Name} has been saved to Database ;)`
            });
        }
    });
});
router.get('/login', function (req, res) {

    if (res.locals.user) res.redirect('/');

    res.render('login', {
        title: 'Log in'
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: 'https://facebook.com',
        failureRedirect: 'https://google.com',

    })(req, res, next);
});

router.get('/logout', function (req, res) {

    req.logout();

    res.redirect('/users/login')
});

module.exports = router;