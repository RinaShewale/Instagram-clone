const express = require("express")
const authcontroller= require("../controllers/auth.controller")
const identifyUser= require("../middlewares/auth.middleware")

const authrouter = express.Router()

authrouter.post("/register",authcontroller.registercontroller)
authrouter.post("/login", authcontroller.logincontroller)
authrouter.post("/get-me", identifyUser, authcontroller.getmecontroller)

module.exports = authrouter 