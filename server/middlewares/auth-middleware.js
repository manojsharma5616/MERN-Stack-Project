const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!token) {
    // If you attempt to use an expired token, you'll recive a "401 Unauthorized HTTP" response
    return res
      .status(401)
      .json({ msg: "Unauthorization HTTP,Token not provided" });
  }
  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefex"
  // console.log("token from auth middleware ",token);
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middleware ", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken,JWT_SECRET_KEY);
    console.log("isVerified ",isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log("userData ",userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};
module.exports = authMiddleware;
