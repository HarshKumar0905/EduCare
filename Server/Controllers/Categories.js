const Category = require('../Models/Category');
const Course = require("../Models/Course");
function getRandomInt(max){
    return Math.floor(Math.random() * max);
};

exports.createCategory = async (req,res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const categoryDetails = await Category.create({
            name : name,
            description : description
        });
        return res.status(200).json({
            success : true,
            message : 'Category created successfully',
            categoryDetails
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.showAllCategories = async (req,res) => {
    try{
        const allCategories = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success : true,
            message : 'All categories are returned successfully',
            data : allCategories
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.categoryPageDetails = async (req,res) => {
    try{
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path : "courses",
            match : { status : "Published" },
            
        }).populate({
            path : "courses",
            populate : {
                path : "ratingAndReviews"
            }
        })
        .populate({
            path : "courses",
            populate : {
                path : "instructor"
            }
        }).exec();
        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : 'Could not fetch required category'
            });
        }
        if(selectedCategory.courses.length === 0){
            return res.status(404).json({
                success: false,
                message : "No courses found for the selected category."
            });
        }
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
            courses: { $not: { $size: 0 } }
        });
        const differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        ).populate({
            path : "courses",
            match : { status : "Published" },
        }).populate({
            path : "courses",
            populate : {
                path : "ratingAndReviews"
            }
        })
        .populate({
            path : "courses",
            populate : {
                path : "instructor"
            }
        }).exec();
        const allCategories = await Category.find()
        .populate({
            path : "courses",
            match : {status : "Published"}
        }).exec();
        const mostSellingCourses =  await Course.find({status : 'Published'})
        .sort({ "studentsEnrolled.length": -1 }).populate("ratingAndReviews").populate("instructor")
        .exec();
        return res.status(200).json({
            success : true,
            messagge : 'Fetched all category page details',
            data : {
                selectedCategory : selectedCategory,
			    differentCategory : differentCategory,
			    mostSellingCourses : mostSellingCourses
            }
        });
    }
    catch(error){
        return res.status(500).json({
			success : false,
			message : "Internal server error",
			error : error.message
        });
    }
}