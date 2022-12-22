import express from "express";
import jwt from "jsonwebtoken";
import { upload } from "../../config/multerConfig";
import { login, register } from "./auth_controller"

const router = express.Router();

router.post("/register",upload.single("picture"), register);
router.post("/login",login);

export default router;