const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth");
const { createJob, singleJob } = require("../controllers/jobsController");


//job type routes
// /api/job/create
router.post("/job/create", isAuthenticated, createJob);

// /api/job/:id
router.get("/job/:id", singleJob);

module.exports = router;
