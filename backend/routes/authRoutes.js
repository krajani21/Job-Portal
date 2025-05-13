const express = require("express");
const { signup, signin, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

//auth router
//this is the route for signup
// /api/signup
router.post("/signup", signup);


//this is the route for signin
// /api/signin
router.post("/signin", signin);

//this is the route for signout
// /api/signout
router.get("/logout", logout);

//this is the route for user profile
// /api/me
//isAuthenticated is between the request and the controller
//user should be authenticated in order to see his profile
router.get("/me", isAuthenticated, userProfile);

module.exports = router;