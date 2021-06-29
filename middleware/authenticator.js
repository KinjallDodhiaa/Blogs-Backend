const User = require("../models/User");
const createError = require("http-errors");
/**
 * VERIFY THE TOKEN
 * 1. GET TOKEN FROM THE REQUEST
 * 2. FIND THE USER WITH THE REQUEST
 * 3. HANDLE THE USER OBJECT: IF EXISTS (USER WAS FOUND) -> NEXT()
 *      IF NOT EXISTEND (NO USER FOUND) -> THROW AN ERROR
 */
const auth = async (req, res, next) => {
  // RETIREVED THE USER TOKEN FROM THE REQUEST
  const token = req.header("auth");
  try {
    // ACCESS THE DATABASE AND FIND THE USER
    const user = await User.findByToken(token);
    console.log(token);
    // IF NO USER WAS FOUND, THEN RETURN A 404 ERROR
    if (!user) throw new createError.NotFound();
    req.user = user;
    req.token = token;
    // IF THE USER WAS FOUND, THEN CONTINUE WITH THE NEXT MIDDLEWARE
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = auth;
