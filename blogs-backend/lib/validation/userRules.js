const { body } = require("express-validator");
exports.userValidationRules = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];
