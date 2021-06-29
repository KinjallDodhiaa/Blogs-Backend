const { body } = require("express-validator");
exports.postValidationRules = [
  body("title")
    .isLength({ min: 5, max: 200 })
    .withMessage(
      "Title is required. Its length should be minimum 5 characters and maximum 200"
    ),
  body("content")
    .isLength({ min: 20 })
    .withMessage(
      "Content is required. Its length should be minimum 20 characters"
    ),
  body("name").notEmpty().withMessage("Name is required"),
];
