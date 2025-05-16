const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const ONE_HOUR = 60 * 60 * 1000;//60 minutes * 60 seconds * 1000 milliseconds

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
        const user = await User.create(req.body);
        //201 means creates successfully, and send to the frontend
        res.status(201).json({
            success: true,
            data: user
        })
        
    } catch (error) {
        next(error);
        
    }
}

exports.signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        //validate the user
        if(!email){
            //403 means server understodd the request but refused to authorize it
            return next(new ErrorResponse("Please provide an email", 403));
        }
        if(!password){
            return next(new ErrorResponse("Please provide a password", 403));
        }

        //check the user email
        const user = await User.findOne({email})
        if(!user){
            //400 means bad request
            return next(new ErrorResponse("Invalid credentials", 400));
        }
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new ErrorResponse("Invalid credentials", 400));
        }
        sendTokenResponse(user, 200, res);
        
    } catch (error) {
        next(error);
        
    }
}

const sendTokenResponse = async(user, statusCode, res) => {
    const token = await user.getJwtToken();
    res.status(statusCode)
    .cookie("token", token, {maxAge: ONE_HOUR, httpOnly: true})//cookie expires in 1 hour
    .json({
        success: true,
        role:user.role
    })
}

//logout feature
exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Successfully logged out"
    })
}

//user profile
exports.userProfile = async(req, res, next) => {
    //remove the password from the response
    const user = await User.findById(req.user.id).select("-password")
    //send to the frontend, the current logged in user
    res.status(200).json({
        success: true,
        user
    })
}