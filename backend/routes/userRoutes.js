const express = require("express");
const { allUsers } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//this is the route for all users
//this is the route for user profile
// /api/allusers
//isAuthenticated is between the request and the controller
router.get("/allusers", isAuthenticated, isAdmin, allUsers);

module.exports = router;