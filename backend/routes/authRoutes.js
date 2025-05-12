const express = require("express");
const { signup } = require("../controllers/authController");
const router = express.Router();

//auth router
// /api/signup
//this is the route for signup
router.post("/signup", signup);

module.exports = router;