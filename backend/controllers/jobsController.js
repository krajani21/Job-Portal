const Job = require("../models/jobModels");
const ErrorResponse = require("../utils/errorResponse");

//create a job category
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
        })
        
    } catch (error) {
        next(error);
        
    }
}

//show a single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
        
    } catch (error) {
        next(error);
        
    }
}

//update job by id
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {new: true}).populate("jobType", "jobTypeName").populate("user", "firstName lastName");
        res.status(200).json({
            success: true,
            job
        })
        
    } catch (error) {
        next(error);
        
    }
}


