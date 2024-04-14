const { passwordResetLinkEmail } = require('../Mails/passwordResetLinkEmail');
const User = require('../Models/User');
const mailSender = require('../Utilities/MailSender');
const crypto = require('crypto');

exports.resetPasswordToken = async (req,res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success : false,
                message : 'Email address field cannot be empty'
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message : 'Your email is not registered with us'
            });
        }
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email : email},
          {token, resetPasswordExpires : Date.now() + 5*60*1000},
          {new : true});
        const url = `https://edu-care-kappa.vercel.app/update-password/${token}`;
        await mailSender(email, `Reset Password Link` , passwordResetLinkEmail(user.firstName, url));
        return res.status(200).json({
            success : true,
            message : 'Email sent successfully, please check your mail'
        })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Error occured while reseting the password'
        });
    }
}

exports.resetPassword = async (req,res) => {
    try{
        const {password, confirmPassword, token} = req.body;
        if(!token||!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const userDetails = await User.findOne({token : token});
        if(!userDetails){
            return res.status(401).json({
                success : false,
                message : 'Token is invalid'
            });
        }
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success : false,
                message : 'Token is expired, generate your new token'
            });
        }
        if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : 'Passwords are not matching'
            });
        }
        const hashedPassword = password;
        await User.findOneAndUpdate({token : token},
            {password : hashedPassword}, {new : true});
        return res.status(200).json({
            success : true,
            message : 'Password is reset successfully'
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : ''
        });
    }
}