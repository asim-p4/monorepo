import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  validate,
  registerSchema,
  loginSchema,
} from "../middlewares/validator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

export default router;
