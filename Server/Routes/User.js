const express = require("express");
const router = express.Router();

const {
  logIn,
  signUp,
  sendOTP,
  changePassword,
} = require("../Controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword");

const { Auth } = require("../Middlewares/Auth");

const {createContact} = require("../Controllers/ContactUs");

router.post("/login", logIn);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", Auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

router.post("/contactus", createContact);

module.exports = router;