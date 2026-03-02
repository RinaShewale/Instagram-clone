const mongoose = require("mongoose")


const postschema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },

    imgURI: {
        type: String,
        require: [true, "imgURI is required for creating post"]
    },

    user: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userid is required for creating post"]
        
    }
})

const postmodel = mongoose.model("post", postschema)

module.exports = postmodel