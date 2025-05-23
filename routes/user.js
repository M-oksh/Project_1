const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLogInForm )
.post(saveRedirectUrl,passport.authenticate("local" ,{failureRedirect : "/login" , failureFlash: true}),userController.LogIn);
 
router.get("/logout" , userController.LogOut );

module.exports = router;