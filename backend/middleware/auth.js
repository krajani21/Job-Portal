const errorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//check if the user is authenticated
exports.isAuthenticated = async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        //401 means lack of authentication (unauthorized client error) for requested resource
        return next(new errorResponse("unauthorized access to this route", 401));
    }

    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
        
    } catch (error) {
        return next(new errorResponse("unauthorized access to this route", 401));
        
    }

}

//middleware to check if the user is admin
exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0){
        return next(new errorResponse("access denied, you must be an admin", 401));
    }
    next();
}