const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  deleteCourse,
  getInstructorCourses,
  editCourse,
  getFullCourseDetails
} = require("../Controllers/Course");

const {
  updateCourseProgress
} = require("../Controllers/CourseProgress");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../Controllers/Categories");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../Controllers/RatingAndReview");

const { Auth, isInstructor, isStudent, isAdmin } = require("../Middlewares/Auth");

router.post("/createCourse", Auth, isInstructor, createCourse);
router.post("/editCourse", Auth, isInstructor, editCourse);
router.delete('/deleteCourse', Auth, isInstructor, deleteCourse);
router.post("/addSection", Auth, isInstructor, createSection);
router.post("/updateSection", Auth, isInstructor, updateSection);
router.post("/deleteSection", Auth, isInstructor, deleteSection);
router.post("/updateSubSection", Auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", Auth, isInstructor, deleteSubSection);
router.post("/addSubSection", Auth, isInstructor, createSubSection);
router.get("/getInstructorCourses", Auth, isInstructor, getInstructorCourses);
router.post("/getFullCourseDetails", Auth, getFullCourseDetails);
router.get("/getAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/updateCourseProgress", Auth, isStudent, updateCourseProgress);

router.post("/createCategory", Auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", Auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;