const User = require("../models/User");
const createError = require("http-errors");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

/**Add user is used for signing up */
exports.addUser = async (req, res, next) => {
  console.log(req);
  try {
    const user = new User(req.body);
    /** Retrieve a token for the user */
    const token = user.generateAuthToken();
    await user.save();
    /** Send back the token with public fields to user */
    const data = user.getPublicFields();
    res.status(200).header("auth", token).send(data);
  } catch (e) {
    next(e);
  }
};

/** The route for signing in */
exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    // Find user in the database
    const user = await User.findOne({ email });
    // checking if the password is correct
    const valid = await user.checkPassword(password);
    console.log(valid);
    if (!valid) throw new createError.NotFound();

    // retrieve a token
    const token = user.generateAuthToken();
    const data = user.getPublicFields();

    // respond with token and public fields
    res.status(200).header("auth", token).send(data);
  } catch (error) {
    next(error);
  }
};
