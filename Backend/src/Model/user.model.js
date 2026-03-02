const mongoose = require("mongoose")



const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "user is already exist"],
        required: [true, "user is  required"],
    },

    email: {
        type: String,
        unique: [true, "email is already exist"],
        required: [true, "email is  required"]
    },

    password: {
        type: String,
        required: [true, "password is  required"],
        select:false
    },

    bio: String,
    profile_img: {
        type: String,
        default: "https://ik.imagekit.io/n7wnun9xb/images.png"
    },

     savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }] 
})

const usermodel = mongoose.model("user", userschema)


module.exports = usermodel