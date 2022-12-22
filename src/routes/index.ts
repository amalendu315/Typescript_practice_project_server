import express from "express";
import authRoutes from "../api/auth/auth_route";
import userRoutes from "../api/users/users_route";

const router = express.Router();

router.use("/auth",authRoutes);
router.use("/users",userRoutes);

export default router;