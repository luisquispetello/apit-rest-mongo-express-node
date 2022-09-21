import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middleWares/validationResultExpress.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email", "Incorrect email format").isEmail().normalizeEmail(),
    body("password", "Incorrect password format").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Incorrect email format").isEmail().normalizeEmail(),
    body("password", "Incorrect password format").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;
