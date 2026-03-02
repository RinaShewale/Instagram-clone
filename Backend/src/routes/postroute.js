const express= require("express")
const postrouter=express.Router()
const postcontroller= require("../controllers/post.controller")
const multer=require("multer")
const identifyUser = require("../middlewares/auth.middleware")
const upload=multer({storage:multer.memoryStorage()})





postrouter.post("/",upload.single("image"),identifyUser,postcontroller.createpostcontroller)

postrouter.get("/",identifyUser,postcontroller.getuserpost)

postrouter.get("/details/:postid",identifyUser,postcontroller.getUserPostDetails)

postrouter.post("/like/:postid",identifyUser,postcontroller.likecontroller)
postrouter.post("/unlike/:postid",identifyUser,postcontroller.unlikecontroller)

postrouter.get("/feed",identifyUser,postcontroller.getFeedController)

postrouter.post("/save/:postid",identifyUser,postcontroller.savepostcontroller)

postrouter.get("/getsave",identifyUser,postcontroller.getsavepostcontroller)

module.exports=postrouter