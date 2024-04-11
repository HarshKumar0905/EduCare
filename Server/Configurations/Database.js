const mongoose = require('mongoose');
require('dotenv').config();

exports.DBConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DB connected successfully'))
    .catch((error) => {
        console.log('DB connection failed');
        console.error(error);
    });
}