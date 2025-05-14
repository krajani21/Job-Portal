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

