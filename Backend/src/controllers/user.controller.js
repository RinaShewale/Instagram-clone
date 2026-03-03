const followmodel = require("../Model/follow.model")
const usermodel = require("../Model/user.model")

async function followusercontroller(req, res) {
    const followusername = req.user.username
    const followeeusername = req.params.username

    if (followusername === followeeusername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }


    const isfollowexist = await usermodel.findOne({
        username: followeeusername
    })

    if (!isfollowexist) {

        
        return res.status(404).json({
            message: "you are trying to follow doesn't exist"
        })
    }


    const isalreadyfollowing = await followmodel.findOne({
        follower: followusername,
        followee: followeeusername
    })

    if (isalreadyfollowing) {
        return res.status(200).json({
            message: "you are already follow"
        })
    }

     const followrecord = await followmodel.create({
        follower: followusername,
        followee: followeeusername,
        status: "accepted"
    })

    res.status(200).json({
        message: `you are now follow ${followeeusername}`
    })




}


async function unfollowed_usercontroller(req, res) {
    const followusername = req.user.username
    const followeeusername = req.params.username

    const isuserfollowing = await followmodel.findOne({
        follower: followusername,
        followee: followeeusername
    })

    if (!isuserfollowing) {
        return res.status(200).json({
            message: `you are not following ${followeeusername}`
        })
    }

    await followmodel.findByIdAndDelete(isuserfollowing._id)
    res.status(200).json({
        message: `you have unfollowed ${followeeusername}`
    })

}



async function statusController(req, res) {
    const followusername = req.params.username
    const followeeusername = req.user.username
    const { status } = req.body

    if (!["accepted", "rejected"].includes(status)) {
        return res.status(404).json({
            message: "invalid status value"
        })
    }
    const request = await followmodel.findOne({
        follower: followusername,
        followee: followeeusername
    })

    if (!request) {
        return res.status(400).json({
            message: "follow request is not found"
        })
    }


    if (request.followee != req.user.username) {
        return res.status(403).json({
            message: "you are not authorized"
        })
    }

    request.status = status
    await request.save()

    res.status(200).json({
        message: `Request ${status} successfull`, request
    })
}


async function getfollowercontroller(req, res) {
    const username = req.user.username


    const followerdata = await followmodel.find({
        followee: username,
        status: 'accepted'
    })

    const followingdata = await followmodel.find({
        follower: username,
        status: 'accepted'
    })


    const followerusername = followerdata.map(f => f.follower)
    const followingusername = followingdata.map(f => f.followee)

    const followers = await usermodel.find({
        username:{ $in: followerusername }
    })

    const following = await usermodel.find({
        username:{ $in: followingusername }
    })


    res.status(200).json({
        followers,following
    })


}

module.exports = {
    followusercontroller,
    unfollowed_usercontroller,
    statusController,
    getfollowercontroller
}