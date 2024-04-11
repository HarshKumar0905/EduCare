const express = require("express");
const router = express.Router();

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} = require("../Controllers/Profile");

const { Auth, isInstructor } = require("../Middlewares/Auth");

router.delete("/deleteProfile", Auth,  deleteAccount);
router.put("/updateProfile", Auth, updateProfile);
router.get("/getUserDetails", Auth, getAllUserDetails);

router.get("/getEnrolledCourses", Auth, getEnrolledCourses);
router.get("/instructorDashboard", Auth, isInstructor, instructorDashboard);
router.put("/updateDisplayPicture", Auth, updateDisplayPicture);
module.exports = router;