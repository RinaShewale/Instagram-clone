const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {

 const token = req.cookies?.token; // optional chaining for safety
    console.log("Cookies received:", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "User not authorized" });
  }
}

module.exports = identifyUser;