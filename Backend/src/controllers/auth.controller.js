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
    }, process.env.JWT_TOKEN, { expiresIn: "4d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // dev sathi
        sameSite: "lax", // cross-origin support
        maxAge: 1000 * 60 * 60 * 24
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
    const { username, password } = req.body;

    const user = await usermodel.findOne({
        username: username
    }).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) return res.status(404).json({ message: "Password is not valid" });

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_TOKEN,
        { expiresIn: "4d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // dev sathi
        sameSite: "lax", // cross-origin support
        maxAge: 1000 * 60 * 60 * 24
    });

    // **Return token in response body, not cookie**
    res.status(200).json({
        message: "User logged in",
        token, // send token here
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_img: user.profile_img
        }
    });
}


async function getmecontroller(req, res) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Not authenticated" });

  const user = await usermodel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    email: user.email,
    username: user.username,
    bio: user.bio,
    profile_img: user.profile_img
  });
}


module.exports = {
    registercontroller,
    logincontroller,
    getmecontroller
}