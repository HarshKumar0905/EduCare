const express = require('express');
const app = express();

const userRoutes = require('./Routes/User');
const profileRoutes = require('./Routes/Profile');
const paymentRoutes = require('./Routes/Payments');
const courseRoutes = require('./Routes/Course');

const dataBase = require('./Configurations/Database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./Configurations/Cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

require('dotenv').config();
const PORT = process.env.PORT || 7000;

dataBase.DBConnect();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : '*',
        credentails : true
    })
);
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));
cloudinaryConnect();

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);

app.get('/', (req,res) => {
    return res.json({
        success : true,
        message : 'Server has been started'
    });
});
app.listen(PORT, () => {
    console.log(`App is running at Port No.${PORT}`);
});