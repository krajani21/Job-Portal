const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");





const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxLength: 70,
    },

    description: {
        type: String,
        trim: true,
    },

    salary: {
        type: String,
        trim: true,
    },

    location:{
        type: String,
    },
    interviewDate:{
        type: Date,
    },
    applicationStatus:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",

    },

    user:{
        type: ObjectId,
        reference: "User",
        require: true
    },

}, { timestamps: true });


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxLength: [32, "First name should not exceed 32 characters"],
    },

    LastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxLength: [32, "Last name should not exceed 32 characters"],
    },

    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,   
        match:[
            /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]

    },

    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minLength: [6, "Password should be at least 6 characters"],
    },

    jobsHistory:[jobsHistorySchema],

    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

//ecnrypt password before saving
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compare password with the one in the database
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//get JWT token
userSchema.methods.getJwtToken = function (){
    //id of the currently logged in user
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        //cookie expiration and token expiration is the same i.e. 1 hour
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);