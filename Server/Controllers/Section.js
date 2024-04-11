const Section = require('../Models/Section');
const SubSection = require('../Models/SubSection');
const Course = require('../Models/Course');
const { populate } = require('../Models/Category');

exports.createSection = async (req,res) => {
    try{
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const newSection = await Section.create({sectionName});
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId, {
                $push:{
                    courseContent : newSection._id
                }
            }, {new : true}).populate({
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }).exec();
        return res.status(200).json({
            success : true,
            message : 'Section is created successfully',
            updatedCourse
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to create a section',
            error : error.message
        });
    }
}

exports.updateSection = async (req,res) => {
    try{
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, {sectionName}, {new : true})
            .populate('subSection').exec();
        const updatedCourse = await Course.findById(courseId, {new:true})
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec();
        return res.status(200).json({
            success : true,
            message : 'Section is updated successfully',
            data : updatedCourse
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to update a section',
            error : error.message
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{
        const {sectionId, courseId} = req.body;
        if(!sectionId){
            return res.status(400).json({
                success : false,
                message : 'Section ID is required'
            });
        }
        const sectionDetails = await Section.findById(sectionId);
        sectionDetails.subSection.forEach( async (ssid)=>{
            await SubSection.findByIdAndDelete(ssid);
        });
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            $pull : {courseContent : sectionId, new : true}
        }).populate('courseContent').exec();

        const deletedSection = await Section.findByIdAndDelete(sectionId);
        const updateCourse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec();

        return res.status(200).json({
            success : true,
            message : 'Section is deleted successfully',
            data: updateCourse
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to delete a section',
            error : error.message
        });
    }
}