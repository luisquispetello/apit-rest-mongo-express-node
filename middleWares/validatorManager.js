import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyLoginValidator = [
  body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
  body("password", "Incorrect password format").trim().isLength({ min: 6 }),
  validationResultExpress,
];
