import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

export const paramsLinkValidator = [
  param("id", "Not valid format (expressValidator)").trim().notEmpty().escape(),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "invalid format")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startWith("https://")) value = "https://" + value;
        await axios.get(value);
        return value;
      } catch (error) {
        throw new Error("not found longLink 404");
      }
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
  body("password", "Incorrect password format").trim().isLength({ min: 6 }),
  validationResultExpress,
];
