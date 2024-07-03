const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const auth = async (req, res, next) => {
  // check if the request header contain the authorization key
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Grab the token from header (taking the "Bearer" string away)
  const token = authorization.split(" ")[1]; // << [0]=Bearer, [1]=Token

  try {
    // Decode and extract the user id from token
    const { _id } = jwt.verify(token, process.env.SECRET);
    // Save the user in request
    req.user = await User.findById(_id).select("_id");

    next(); // set it here to go to the next middleware, otherwise it will stop here
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = auth
// export default auth