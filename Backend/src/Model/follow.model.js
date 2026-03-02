const mongoose = require("mongoose")

const followschema = new mongoose.Schema({

    follower: {
        type: String
    },

    followee: {
        type: String
    },

    status:{
        type:String,
        default:"panding",
        enum:["panding","accepted","rejected"],
        message:"status can be only be panding,accepted,rejected"
    }

},

    {
        timestamps: true
    }

)

followschema.index({follower:1,followee:1},{unique:true})


const followmodel = mongoose.model("follows", followschema)

module.exports = followmodel