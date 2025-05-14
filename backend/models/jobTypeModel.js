const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema



const jobTypeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        maxLength: 70,
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },

    salary: {
        type: String,
        required: [true, "salary is required"],
        trim: true,
    },

    location:{
        type: String,
    },

    available:{
        type: Boolean,
        default: true,
    },
    jobType: {
        type: ObjectId,
        ref: "JobType",
        required: true

    },

    user:{
        type: ObjectId,
        reference: "User",
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("JobType", jobTypeSchema);