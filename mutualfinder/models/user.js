var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    //gender: {
    //   type: String,
    //    required: true
    //},
    caste: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Zone1: {
        type: String,
        required: true
    },
    Div1: {
        type: String,
        required: true
    },
    Hq1: {
        type: String,
        required: true
    },
    Zone2: {
        type: String,
        required: true
    },
    Div2: {
        type: String,
        required: true
    },
    Hq2: {
        type: String,
        required: true
    },
    image: {
        type: String
    }

});

var User = module.exports = mongoose.model('User', UserSchema);