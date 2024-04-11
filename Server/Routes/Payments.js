const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../Controllers/Payments");
const { Auth, isStudent } = require("../Middlewares/Auth");
router.post("/capturePayment", Auth, isStudent, capturePayment);
router.post("/verifyPayment", Auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", Auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;