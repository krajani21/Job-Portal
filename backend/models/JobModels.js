const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema



const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        maxLength: [32, "First name should not exceed 32 characters"],
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

    user:{
        type: ObjectId,
        reference: "User",
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);