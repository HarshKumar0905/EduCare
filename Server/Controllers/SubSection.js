const SubSection = require('../Models/SubSection');
const Section = require('../Models/Section');
const cloudinary = require('cloudinary').v2;
const {uploadImageToCloudinary} = require('../Utilities/ImageUploader');

exports.createSubSection = async (req,res) => {
    try{
        const {sectionId, title, description} = req.body;
        const video = req.files.videoFile;
        if(!sectionId || !title || !description
            || !video){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const uploadVideo = await uploadImageToCloudinary(video,
            process.env.FOLDER_NAME);
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: `${uploadVideo.duration}`,
            description:description,
            videoUrl:uploadVideo.secure_url
        });
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, {$push : {
                subSection : subSectionDetails._id
            }}, {new : true}).populate('subSection').exec();
        return res.status(200).json({
            success : true,
            message : 'Sub-Section created successfully',
            updatedSection
        }); 
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to create a sub-section',
            error : error.message
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body;
      const subSection = await SubSection.findById(subSectionId);
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }
  
      if (title !== undefined) {
        subSection.title = title;
      }
  
      if (description !== undefined) {
        subSection.description = description;
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video;
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        );
        subSection.videoUrl = uploadDetails.secure_url;
        subSection.timeDuration = `${uploadDetails.duration}`;
      }
  
      await subSection.save();
  
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      );
  
      return res.json({
        success: true,
        data : updatedSection,
        message: "Section updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      });
    }
  };

exports.deleteSubSection = async (req,res) => {
    try{
        const {subSectionId, sectionId} = req.body;
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success : false,
                message : 'Section ID is required'
            });
        }
        const updateSection = await Section.findByIdAndUpdate(sectionId,{
            $pull : {subSection : subSectionId}
        });
        const subSection = await SubSection.findById(subSectionId);
        const updatedSection = await Section.findById(sectionId);
        const videoUrl = subSection.videoUrl;
        cloudinary.uploader.destroy(videoUrl);
        const deletedSubSection = await SubSection.findByIdAndDelete(
            subSectionId
        );
        return res.status(200).json({
            success : true,
            message : 'Sub-Section is deleted successfully',
            data : updatedSection
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : 'Unable to delete a sub-section',
            error : error.message
        });
    }
}