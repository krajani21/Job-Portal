const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
const ErrorResponse = require("../utils/errorResponse");

//display all the users

exports.allUsers = async(req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();



    try {
        //get all users, sorted by last created one, and exclude the password
        const users = await User.find().sort({createdAt: -1}).select("-password")
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        res.status(200).json({
            succes: true,
            users,
            page,
            //pages= ceiling of count/pageSize
            pages: Math.ceil(count / pageSize),
            count
        })
        
    } catch (error) {
        return next(error);
        
    }
}

//display single user
exports.singleUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        return next(error);
        
    }
}

//edit user
exports.editUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        return next(error);
        
    }
}

//delete a user
exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
        
    } catch (error) {
        return next(error);
        
    }
}

//job history
exports.createUserJobsHistory = async(req, res, next) => {
    const {title, description, salary, location} = req.body;

    try {
        const currentUser = await User.findOne({_id:req.user._id});
        if(!currentUser){
            return next(new errorResponse("you must login", 401))
        }else{
            const addJobHistory = {
                title, 
                description, 
                salary, 
                location,
                user: req.user._id
            }

            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save()
        }




        res.status(200).json({
            success: true,
            currentUser
        })
        
    } catch (error) {
        return next(error);
        
    }
}