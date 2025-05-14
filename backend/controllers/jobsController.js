const Job = require("../models/jobModels");
const JobType = require("../models/jobTypeModel")
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

//show all jobs
exports.showJobs = async (req, res, next) => {

    //search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }

    } :{}

    //filter jobs by category
    let ids = [];
    const jobTypeCategory = await JobType .find({}, {_id:1}); //we want to have only ids
    jobTypeCategory.forEach(cat =>{
        ids.push(cat._id);
    })





    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({...keyword}).countDocuments();


    try {
        const jobs = await Job.find({...keyword}).skip(pageSize * (page - 1)).limit(pageSize);
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            ids
        })
        
    } catch (error) {
        next(error);
        
    }
}


