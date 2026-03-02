const express= require("express")
const identifyUser = require("../middlewares/auth.middleware")
const usercontroller=require("../controllers/user.controller")


const userRouter=express.Router()

userRouter.post("/follow/:username",identifyUser, usercontroller.followusercontroller)

userRouter.post("/unfollow/:username",identifyUser, usercontroller.unfollowed_usercontroller)

userRouter.post("/status/:username",identifyUser, usercontroller.statusController)

userRouter.post("/connections",identifyUser, usercontroller.getfollowercontroller)

module.exports=userRouter