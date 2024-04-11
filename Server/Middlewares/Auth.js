const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth = async (req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token || 
        req.get('Authorization')?.replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                success : false,
                message : 'Token is missing'
            });
        }
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(error){
            console.error(error.message);
            return res.status(401).json({
                success : false,
                message : 'Token is invalid'
            });
        }
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while validating the token'
        });
    }
}

exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success : false,
                message : 'This is a protected route for students only'
            });
        }
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified'
        });
    }
}

exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success : false,
                message : 'This is a protected route for instructor only'
            });
        }
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified'
        });
    }
}

exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success : false,
                message : 'This is a protected route for admin only'
            });
        }
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified'
        });
    }
}