const express = require("express")
const cookieParser = require("cookie-parser")
const authrouter = require("./routes/authrouter")
const postrouter = require("./routes/postroute")
const userRouter = require("./routes/userrouter")
const cors = require("cors")


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authrouter)
app.use("/api/post", postrouter)
app.use("/api/user", userRouter)



module.exports = app