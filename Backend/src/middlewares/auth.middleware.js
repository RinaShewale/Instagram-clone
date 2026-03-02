const jwt= require("jsonwebtoken")


async function identifyUser(req,res,next){

    

        const token = req.cookies.token

            console.log("Cookies received:", req.cookies);
    
        if (!token) {
            return res.status(401).json({
                message: "unauthorized user "
            })
        }
    
        let decoded = null
    
        try {
            decoded = jwt.verify(token, process.env.JWT_TOKEN)
    
        }
        catch (err) {
            return res.status(401).json({
                message: "user not authrized"
            })
        }

        req.user=decoded

        next()
    
}

module.exports=identifyUser