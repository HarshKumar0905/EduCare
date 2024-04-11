const Course = require('../Models/Course');
const Category = require('../Models/Category');
const Section = require('../Models/Section');
const SubSection = require('../Models/SubSection');
const RatingAndReview = require("../Models/RatingAndReview");
const User = require('../Models/User');
const {uploadImageToCloudinary} = require('../Utilities/ImageUploader');
const CourseProgress = require("../Models/CourseProgress");
const { convertSecondsToDuration } = require("../Utilities/secToDuration");
require('dotenv').config();

exports.createCourse = async (req,res) => {
    try{
        const {courseName, courseDescription, whatYouWillLearn,
        price, category, tags, status, instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;
        if(!courseName || !courseDescription || !whatYouWillLearn
        || !price || !category || !tags || !thumbnail || !instructions){
            return res.status(400).json({
                success : false,
                message : 'All fields are requried'
            });
        }
        const userID = req.user.id;
        const instructorDetails = await User.findById(userID);
        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : 'Instructor details not found'
            });
        }
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : 'Tag details not found'
            });
        }
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        const newCourse = await Course.create({
            courseName, courseDescription, instructor : instructorDetails._id, instructions,
            whatYouWillLearn, price, tags, category, thumbnail : thumbnailImage.secure_url, status
        });
        
        await User.findByIdAndUpdate(instructorDetails.id,
            {
                $push : {courses : newCourse._id}
            }, {new : true});
        await Category.findByIdAndUpdate(categoryDetails.id,
            {
                $push : {courses : newCourse._id}
            }, {new : true});
        return res.status(200).json({
            success : true,
            message : 'Course is added successfully',
            data : newCourse
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Error occured while creating a course',
            error : error.message
        });
    }
}

exports.showAllCourses = async (req,res) => {
    try{
        const allCourses = await Course.find({}, {courseName:true,
        price:true, thumbnail:true, instructor:true,
        ratingAndReview:true, studentEnrolled:true})
        .populate('instructor').exec();
        return res.status(200).json({
            success : true,
            message : 'All courses are fetched successfully',
            data : allCourses
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Cannot fetch courses data',
            error : error.message
        });
    }
}

exports.getCourseDetails = async (req,res) => {
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId)
        .populate({
            path : 'instructor',
            populate : {
                path : 'additionalDetails'
            }
        })
        .populate('category')
        .populate('ratingAndReviews')
        .populate({
            path : 'courseContent',
            populate : {
                path : 'subSection'
            }
        })
        .exec();
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : 'Invalid course id'
            });
        }
        return res.status(200).json({
            success : true,
            message : 'Course Details are fetched successfully',
            data : courseDetails
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Could not get the course details'
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success : false,
                message: "Course not found"
            });
        }
        await User.findByIdAndUpdate(course.instructor, {$pull : {
            courses : courseId
        }});
        const studentsEnrolled = course.studentsEnrolled;
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
              $pull: { courses: courseId },
            });
        }
        const courseSections = course.courseContent;
        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }
        for(const ratingAndReview of course.ratingAndReviews){
          await RatingAndReview.findByIdAndDelete(ratingAndReview);
          await Course.findByIdAndUpdate({
            courseId, $pull : {ratingAndReviews : ratingAndReview}});
        }
        await Category.findByIdAndUpdate(course.category, 
        {$pull : {courses : courseId}});
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id;
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 }).populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body;
      const updates = req.body;
      const {category} = req.body;
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update");
        const thumbnail = req.files.thumbnailImage;
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        );
        course.thumbnail = thumbnailImage.secure_url;
      }
      if(category){
        await Category.findByIdAndUpdate(course.category, {
          $pull : {courses : courseId}
        }, {new:true});
        await Category.findByIdAndUpdate(category, {
          $push : {courses : courseId}
        }, {new:true});
        await Course.findByIdAndUpdate(courseId, 
        {category}, {new:true});
      }

  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            course[key] = updates[key];
        }
      }
  
      await course.save();
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body;
      const userId = req.user.id;
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      });
  
      console.log("courseProgressCount : ", courseProgressCount);
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        });
      }
  
      let totalDurationInSeconds = 0;
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration);
          totalDurationInSeconds += timeDurationInSeconds;
        });
      });
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};