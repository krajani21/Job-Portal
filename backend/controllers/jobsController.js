const Job = require("../models/jobModels");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

// Create a job
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Show a single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Update job by ID
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.job_id,
            req.body,
            { new: true }
        )
            .populate("jobType", "jobTypeName")
            .populate("user", "firstName lastName");

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Show all jobs with filters and pagination
exports.showJobs = async (req, res, next) => {
    // Keyword search
    const keyword = req.query.keyword
        ? {
              title: {
                  $regex: req.query.keyword,
                  $options: "i"
              }
          }
        : {};

    // Get all job type IDs
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    const ids = jobTypeCategory.map((cat) => cat._id);

    // Category filtering
    const cat = req.query.cat;
    const categ = cat?.trim() ? cat : ids;

    // Get all job locations
    const jobByLocation = await Job.find({}, { location: 1 });
    const locations = jobByLocation.map((val) => val.location);
    const setUniqueLocation = [...new Set(locations)];

    // Location filtering
    const location = req.query.location;
    const locationFilter = location?.trim() ? location : setUniqueLocation;

    // Build MongoDB query filter using $in
    const filter = {
        ...keyword,
        jobType: { $in: Array.isArray(categ) ? categ : [categ] },
        location: { $in: Array.isArray(locationFilter) ? locationFilter : [locationFilter] }
    };

    // Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await Job.find(filter).countDocuments();
        const jobs = await Job.find(filter)
            .sort({createdAt: -1})
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
};
