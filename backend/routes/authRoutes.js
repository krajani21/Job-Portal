const express = require("express");
const { signup, signin } = require("../controllers/authController");
const router = express.Router();

//auth router
// /api/signup
//this is the route for signup
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;