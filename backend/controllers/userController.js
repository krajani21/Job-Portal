const User = require("../models/userModel");
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