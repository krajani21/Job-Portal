const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
})



module.exports = mongoose.model("User", userSchema);