const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    //check if the user already exists
    const userExist = await User.findOne({email});
    
    if(userExist){
        //client errror, server will not process the request
        //400 is the status code for bad request
        return next(new ErrorResponse("Email already exists", 400));
    }
    try {
        const user = User.create(req.body);
        //201 means creates successfully, and send to the frontend
        res.status(201).json({
            success: true,
            data: user
        })
        
    } catch (error) {
        next(error);
        
    }


    next();
}