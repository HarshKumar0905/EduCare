const User = require('../Models/User');
const Profile = require('../Models/Profile');
const OTP = require('../Models/OTP');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const mailSender = require('../Utilities/MailSender');
require('dotenv').config();

exports.sendOTP = async (req,res) => {
    try{
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success : 'false',
                message : 'User is already registered'
            });
        }
        const options = {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        }; 
        var otp = otpGenerator.generate(6, options);
        const isNotUnique = await OTP.findOne({otp : otp});
        while(isNotUnique){
            otp = otpGenerator.generate(6, options);
            isNotUnique = await OTP.findOne({otp : otp});
        }
        const otpPayload = {email, otp};
        const insertEntry = await OTP.create(otpPayload);
        return res.status(200).json({
            success : true,
            message : 'OTP sent successfully'
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

exports.signUp = async (req,res) => {
    try{
        const {firstName, lastName, email, password, confirmPassword,
            accountType, otp, contactNumber} = req.body;
        if(!firstName || !lastName || !email || !password ||
            !confirmPassword || !otp){
            return res.status(403).json({
                success : false,
                message : 'All fields are required'
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : 'Password and ConfirmPassword values does not match'
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already registered'
            });
        }
        const recentOTP = await OTP.find({email: email}).sort({createdAt:-1}).limit(1);
        if(recentOTP.length == 0){
            return res.status(400).json({
                success : false,
                message : 'OTP not found'
            });
        }
        if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success : false,
                message : 'Invalid OTP'
            });
        }
        const hashedPassword = password;
        const profileDetails = await Profile.create({
            gender : null, dateOfBirth : null, about : null, 
            contactNumber : null
        });
        const userEntry = await User.create({
            firstName, lastName, email, contactNumber, 
            password : hashedPassword, accountType, additionalDetails :
            profileDetails._id, image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        });
        return res.status(200).json({
            success : true,
            message : 'User is registered successfully',
            userEntry
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'User cannot be registered, please try again'
        });
    }
}

exports.logIn = async (req,res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const existingUser = await User.findOne({email}).populate('additionalDetails').exec();
        if(!existingUser){
            return res.status(401).json({
                success : false,
                message : 'User is not registered, please SignUp first'
            });
        }
        if(password === existingUser.password){
            const payload = {
                email : existingUser.email,
                id : existingUser._id,
                accountType : existingUser.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET,
                {expiresIn : '2h'});
                
            existingUser.toObject();
            existingUser.token = token;
            existingUser.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            };
            res.cookie('token', token, options).status(200).json({
                success : true,
                token,
                existingUser,
                message : 'LoggedIn successfully'
            });
        }
        else{
            return res.status(401).json({
                success : false,
                message : 'Password is incorrect'
            });
        }

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success  : false,
            message : 'Login faliure, please try again'
        });
    }
}

exports.changePassword = async (req,res) => {
    try{ 
        const {email, oldPassword, 
            newPassword, confirmPassword} = req.body;
        if(!email || !oldPassword || !newPassword || 
            !confirmPassword){
            return res.status(403).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message : 'User is not registered, please SignUp first'
            });
        }
        if(oldPassword === user.password){
            return res.status(401).json({
                success : false,
                message : 'Password is incorrect'
            });
        }
        if(newPassword !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : 'New Passwords and its confirmation does not match'
            });
        }
        const updatedPassword = newPassword;
        await User.findOneAndUpdate({email : email},
            {password : updatedPassword}, {new : true});
        
        async function sendVerificationEmail(email, newPassword) {
            try{
                let body = `<h3>Hello user,</h3>
                <p>Your account password has been updates successfullt</p>
                <p>Your new password - ${newPassword}</p>`;
                const response = await mailSender(email, 
                    'Verification Email to reset your password from StudyNotion', body);
            }
            catch(error){
                console.log('Error occured while sending mail');
                console.error(error.message);
            }
        }
        await sendVerificationEmail(user.email, confirmPassword);
        return res.status(200).json({
            success : true,
            message : 'Password has been updates successfully'
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Error occured while reseting the password'
        });
    }
}