const express = require("express");
//Import the authenticator from the middlewares
const auth = require("../middleware/authenticator");
const { validateInputs } = require("../middleware/validator");
const { postValidationRules } = require("../lib/validation/postRules");

//create a new router
const router = express.Router();
const {
  getPosts,
  addPosts,
  deletePost,
  updatePosts,
} = require("../controller/postsController");

router.route("/").get(getPosts).post(validateInputs(postValidationRules),auth, addPosts);
router.route('/:id').delete(auth, deletePost).put(validateInputs(postValidationRules),auth, updatePosts);










//export router to app.js
module.exports = router;
