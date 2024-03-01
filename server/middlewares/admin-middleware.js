const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const adminMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }
    
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from adminMiddleware", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        if (!userData.isAdmin) {
            return res.status(403).json({ message: "Forbidden. User is not an admin." });
        }

        console.log(userData);
        req.token = token;
        req.user = userData;
        req.userID = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = adminMiddleware;
