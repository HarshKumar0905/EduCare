const RatingAndReview = require('../Models/RatingAndReview');
const Course = require('../Models/Course');
const mongoose = require('mongoose');

exports.createRating = async (req,res) => {
    try{
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;
        const courseDetails = await Course.findById(
            {_id : courseId, studentsEnrolled : {$elemMatch :{$eq : userId}}}
        );
        console.log("Course Details : ", courseDetails);
        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : 'Student is not enrolled in course'
            });
        }
        const alreadyReviewed = await RatingAndReview.findOne({
            user : userId, course : courseId
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success : false,
                message : 'Course is already reviewed by user'
            });
        }
        const ratingReview = await RatingAndReview.create({
            rating, review, course : courseId, user : userId
        });
        await Course.findByIdAndUpdate({_id : courseId},{
            $push : {ratingAndReviews : ratingReview._id}
        }, {new : true});
        return res.status(200).json({
            success : true,
            message : 'Rting and review created successfully',
            ratingReview
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Could not create rating and review'
        });
    }
}

exports.getAverageRating = async (req,res) => {
    try{
        const {courseId} = req.body.courseId;
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectID(courseId)
                }
            },
            {
                $group : {
                    _id : null,
                    averageRating : {$avg : 'rating'}
                }
            }
        ]);
        if(result.length>0){
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating
            });
        }
        return res.status(200).json({
            success : true,
            message : 'Average rating is 0, no ratings given till now',
            averageRating : 0
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Could not find average course rating'
        });
    }
}

exports.getAllRating = async (req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating : 'desc'})
        .populate({
            path : 'user',
            select : 'firstName lastName email image'
        })
        .populate({
            path : 'course',
            select : 'courseName'
        }).exec();
        return res.status(200).json({
            success : true,
            message : 'All rating and review fetched successfully',
            data : allReviews
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Could not fetch all rating and reviews'
        });
    }
}