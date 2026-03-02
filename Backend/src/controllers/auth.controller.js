const usermodel = require("../Model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registercontroller(req, res) {
    const { email, username, password, bio, profile_img } = req.body

    const isuserexist = await usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isuserexist) {
        return res.status(409).json({
            message: "user is already exist" + (isuserexist.email == email ? "email is already exist" : "username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        username,
        email,
        bio,
        profile_img,
        password: hash
    })

    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_TOKEN, { expiresIn: "1d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({
        message: "user register successfully",

        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_img: user.profile_img
        }
    })


}


async function logincontroller(req, res) {

    const { username, email, password } = req.body

    const user = await usermodel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }




    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if (!ispasswordvalid) {
        return res.status(404).json({
            message: "password is not valid"
        })
    }

    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_TOKEN, { expiresIn: "1d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });


    res.status(200).json({
        message: "user logged in ",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_img: user.profile_img
        }
    })

}


async function getmecontroller(req, res) {
    const userId = req.userId
    const user = await usermodel.findById(userId)

    res.status(200).json({
        email: user.email,
        username: user.username,
        bio: user.bio,
        profile_img: user.profile_img
    })
}


module.exports = {
    registercontroller,
    logincontroller,
    getmecontroller
}