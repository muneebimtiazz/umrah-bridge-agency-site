import express from "express";
import { signup, login, refresh, logout, me } from "./auth.controller.js";
import { validateSignup, validateLogin } from "./auth.validation.js";
import { verifyAccessToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyAccessToken, me);

export default router;