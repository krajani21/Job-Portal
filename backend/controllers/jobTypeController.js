const JobType = require("../models/jobTypeModel");
const errorResponse = require("../utils/errorResponse");
const ErrorResponse = require("../utils/errorResponse");

//create a job category
exports.createJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id

        });
        res.status(201).json({
            success: true,
            jobT
        })
        
    } catch (error) {
        next(error);
        
    }
}

//all jobs category
exports.allJobsType = async (req, res, next) => {
    try {
        const jobT = await JobType.find();
        res.status(200).json({
            success: true,
            jobT
        })
        
    } catch (error) {
        next(error);
        
    }
}

//update job type
exports.updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {new: true});
        res.status(200).json({
            success: true,
            jobT
        })
        
    } catch (error) {
        next(error);
        
    }
}

//delete job type
exports.deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndDelete(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        })
        
    } catch (error) {
        next(new errorResponse("server error", 500));
        
    }
}