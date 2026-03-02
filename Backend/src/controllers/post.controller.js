
const postmodel = require("../Model/post.model")
const likemodel = require("../Model/like.model")
const usermodel = require("../Model/user.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new ImageKit({
    privateKey: process.env.ImageKit_Private_key
})

async function createpostcontroller(req, res) {


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "/cohort-2-insta-clone"
    })


    const post = await postmodel.create({
        caption: req.body.caption,
        imgURI: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "post created successfully", post
    })
}


async function getuserpost(req, res) {

    const userId = req.user.id
    const post = await postmodel.find({ user: userId })
    res.status(200).json({
        message: "user post featched", post
    })


}


async function getUserPostDetails(req, res) {


    const userid = req.user.id

    const postId = req.params.postid

    const post = await postmodel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post is not found"
        })
    }

    const isvaliduser = post.user.toString() === userid
    if (!isvaliduser) {
        res.status(403).json({
            message: "forbidden content"
        })
    }


    res.status(200).json({
        message: "user post featched", post
    })

}

async function likecontroller(req, res) {
    const username = req.user.username
    const postId = req.params.postid



    const post = await postmodel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    const like = await likemodel.create({
        post: postId,
        user: req.user.username
    })

    res.status(200).json({
        message: "post liked successfully"
    })

}

async function unlikecontroller(req, res) {

    const postId = req.params.postid
    const username = req.user.username

    const isliked = await likemodel.findOne({
        post: postId, user: username
    })

    if (!isliked) {
        return res.status(400).json({
            message: "post didn't like"
        })
    }
    await likemodel.findOneAndDelete({ _id: isliked._id })

    return res.status(200).json({
        message: "post unliked successfully"
    })


}



async function getFeedController(req, res) {

    const user = req.user
    console.log("Checking feed for user:", user.username)


    const posts = await Promise.all((await postmodel.find({}).sort({ _id: -1 }).populate("user").lean())
        .map(async (post) => {

            const isLiked = await likemodel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}


async function savepostcontroller(req, res) {

    const username = req.user.username
    const postId = req.params.postid;

    const user = await usermodel.findOne({ username })

    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    if (!user.savedPosts.includes(postId)) {
        // Save it
        user.savedPosts.push(postId)
    } else {
        // Unsave it
        user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
    }

    await user.save()

    return res.status(200).json({
        message: user.savedPosts.includes(postId) ? "Post saved" : "Post unsaved",
    })

}


async function getsavepostcontroller(req, res) {
    const username = req.user.username

     const user = await usermodel
        .findOne({ username })
        .populate({
            path: "savedPosts",
            populate: {
                path: "user",
                select: "username profile_img" 
            }
        }).lean();

    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        savedPosts: user.savedPosts
    })

}

module.exports = {
    createpostcontroller,
    getuserpost,
    getUserPostDetails,
    likecontroller,
    unlikecontroller,
    getFeedController,
    savepostcontroller,
    getsavepostcontroller

}