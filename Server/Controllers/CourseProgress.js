const CourseProgress = require("../Models/CourseProgress");
const SubSection = require("../Models/SubSection");

exports.updateCourseProgress = async (req,res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;
    try {
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                error : "Invalid SubSection"
            });
        }
        const courseProgress = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId
        });
        if(!courseProgress){
            return res.status(404).json({
                success : false,
                error : "Course Progress does not exist"
            });
        }
        else{
            if(courseProgress?.completedVideos?.includes(subSectionId)) {
                return res.status(200).json({
                    success : false,
                    message : "Video already completed"
                });
            }
            courseProgress?.completedVideos?.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success : true,
            message : "Course Progress Updated Successfully",
        });
    } 
    catch (error) 
    {
        console.error(error);
        return res.status(400).json({
            error : "Internal Server Error"
        });
    }
}