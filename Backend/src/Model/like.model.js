const mongoose = require("mongoose")

const likeschema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "post is required for creating a like "]
    },

    user: {
        type: String,
        ref: "user",
        required: [true, "user required for creating a like "]
    }
},
    {
        timestamps: true
    }

)

likeschema.index({ post: 1, user: 1 }, { unique: true })

const likemodel = mongoose.model("like", likeschema)

module.exports = likemodel