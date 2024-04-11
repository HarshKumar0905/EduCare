const Profile = require('../Models/Profile');
const User = require('../Models/User');
const Course = require('../Models/Course');
const CourseProgress = require("../Models/CourseProgress");
const {uploadImageToCloudinary} = require('../Utilities/ImageUploader');
const {convertSecondsToDuration} = require("../Utilities/secToDuration");

exports.updateProfile = async (req,res) => {
    try{
        const {about, contactNumber, dateOfBirth, firstName, gender, lastName} = req.body;
        const id = req.user.id;
        if(!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !id){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        await profileDetails.save();
        return res.status(200).json({
            success : true,
            message : 'Profile updated successfully',
            profileDetails
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to update profile',
            error : error.message
        });
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        const id = req.user.id;
        if(!id){
            return res.status(400).json({
                success : false,
                message : 'Could not fetch id of the profile'
            });
        }
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : 'User not found'
            });
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success : true,
            message : 'Profile is deleted successfully'
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to delete profile',
            error : error.message
        });
    }
}

exports.getAllUserDetails = async (req,res) => {
    try{
        const id = req.user.id;
        if(!id){
            return res.status(400).json({
                success : false,
                message : 'Could not fetch id of the profile'
            });
        }
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : 'User not found'
            });
        }
        return res.status(200).json({
            success : true,
            message : 'User details are fetched successfully',
            userDetails
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to get all user details',
            error : error.message
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPictures = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPictures,
            process.env.FOLDER_NAME,1000,1000);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },{ new: true });
        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data : updatedProfile
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
      let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
        },
      })
      .exec();

      

      userDetails = userDetails.toObject();
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard = async (req,res) => {
    try{
        const courseDetails = await Course.find({
            instructor : req.user.id
        });
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course?.studentsEnrolled?.length;
            const totalAmountGenerated = totalStudentsEnrolled * course?.price;

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats;
        });

        return res.status(200).json({
            success : true,
            data : courseData
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}