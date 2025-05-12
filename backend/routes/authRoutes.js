const express = require("express");
const { signup, signin, logout } = require("../controllers/authController");
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

module.exports = router;