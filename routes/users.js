var express = require('express');
var router = express.Router();
const { validateInputs } = require("../middleware/validator");
const { userValidationRules } = require("../lib/validation/userRules");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser,
} = require("../controller/usersController");

/* GET users listing. */
router
  .route("/")
  .get(getUsers)
  .post(validateInputs(userValidationRules), addUser);

// route for login
router.route("/login").post(loginUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(validateInputs(userValidationRules), updateUser);


module.exports = router;
