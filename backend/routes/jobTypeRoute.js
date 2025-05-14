const express = require("express");
const router = express.Router();
const {createJobType} = require("../controllers/jobTypeController");
const {isAuthenticated} = require("../middleware/auth")


//job type routes
// /api/type/create
router.post("/type/create", isAuthenticated, createJobType)

module.exports = router;
