const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema



const jobTypeSchema = new mongoose.Schema({

    jobTypeName: {
        type: String,
        required: [true, "Job category is required"],
        trim: true,
        maxLength: 70,
    },

    user:{
        type: ObjectId,
        reference: "User",
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("JobType", jobTypeSchema);