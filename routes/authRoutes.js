const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/get',authController.getAll)
// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/resetPassword', authController.resetPassword);

module.exports = router;
