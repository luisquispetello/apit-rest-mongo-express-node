import { Router } from "express";
import { login, register, infoUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middleWares/validationResultExpress.js";
import { requireToken } from "../middleWares/requireToken.js";

const router = Router();

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

router.get("/protected", requireToken, infoUser)

export default router;