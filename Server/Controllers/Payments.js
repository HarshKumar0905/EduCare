const {instance} = require('../Utilities/Razorpay');
const Course = require('../Models/Course');
const mongoose = require('mongoose');
const crypto = require("crypto");
const User = require('../Models/User');
const mailSender = require('../Utilities/MailSender');
const {courseEnrollmentEmail} = require('../Mails/courseEnrollmentEmail');
const CourseProgress = require("../Models/CourseProgress");
const { paymentSuccessEmail } = require("../Mails/paymentSuccessEmail");

exports.capturePayment = async (req,res) => {
    const {courses} = req.body;
    const userId = req.user.id;
    if(courses.length === 0){
        return res.status(401).json({
            success : false,
            message : "Please provide atleast one course"
        });
    }
    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success : false,
                    message : "Could not find the course"
                });
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success : false,
                    message : "Student already enrolled"
                });
            }
            totalAmount+=course.price;
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
    const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString()
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success : true,
            message : paymentResponse
        });
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "Could not initiate order"
        })
    }
}

exports.verifyPayment = async (req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature
    || !courses || !userId){
        return res.status(401).json({
            success : false,
            message : "Payment Failed"
        });
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256",
    process.env.RAZORPAY_SECRET).update(body.toString())
    .digest("hex");
    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success : true,
            message : "Payment verified"
        });
    }
    return res.status(500).json({
        success : false,
        message : "Payment failed"
    });
}

const enrollStudents = async (courses, userId, res) => {
    if(!userId || !courses){
        return res.status(400).json({
            success : false,
            message : "Please provide data for courses or userId"
        });
    }
    for(const courseId of courses){
    try{
        const enrolledCourse = await Course.findByIdAndUpdate(
          courseId, {$push : {studentsEnrolled : userId}}, {new:true});
        if(!enrolledCourse){
            return res.status(401).json({
                success : false,
                message : "Could not enroll student in course"
            })
        }
        const courseProgress = await CourseProgress.create({
            courseId : courseId,
            userId : userId,
            completedVideos : []
        });
        const enrolledStudent = await User.findByIdAndUpdate(userId,
        {$push : {courses : courseId, courseProgress : courseProgress._id}},
        {new:true});
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`, "../../src/Assets/Logo/Logo-For-Mail.png")
        );
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false, 
            message:error.message
        });
    }
    } 
}

exports.sendPaymentSuccessEmail = async (req,res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success : false,
            message:"Please provide all the fields"
        });
    }
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                success : false,
                message : "Could not fetch user details"
            });
        }
        await mailSender(
            user.email,
            `Payment Received`,
            paymentSuccessEmail(`${user.firstName}`,
            amount/100,orderId, paymentId)
        )
    } 
    catch(error){
        console.log("error in sending mail", error);
        return res.status(500).json({
            success:false, 
            message:"Could not send email"
        });
    }
}