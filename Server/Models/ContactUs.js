const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true
    },
    countryCode : {
        type : String,
        requried : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    message : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('ContactUs', contactUsSchema);