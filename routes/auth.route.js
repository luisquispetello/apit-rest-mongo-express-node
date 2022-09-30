import { Router } from "express";
import {
  login,
  register,
  infoUser,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middleWares/requireToken.js";
import { requireRefreshToken } from "../middleWares/requireRefreshToken.js";
import { bodyLoginValidator } from "../middleWares/validatorManager.js";

const router = Router();

router.post("/register", bodyLoginValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
