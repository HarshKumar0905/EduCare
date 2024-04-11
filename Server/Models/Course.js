const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName : {
        type : String
    },
    courseDescription : {
        type : String
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    whatYouWillLearn : {
        type : String,
        trim : true
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Section'
        }
    ],
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'RatingAndReview',
        }
    ],
    price : {
        type : Number
    },
    thumbnail : {
        type : String
    },
    tags : {
        type : [String],
        requried : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
        }
    ],
    instructions : {
        type : [String]
    },
    status : {
        type : String,
        email : ['Draft', 'Published']
    },
    createdAt: {
		type:Date,
		default:Date.now
	},
});

module.exports = mongoose.model('Course', courseSchema);