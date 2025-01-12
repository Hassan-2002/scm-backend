import authRoutes from  './authentication.js';
import express from "express";
const router = express.Router();

router.use("/auth", authRoutes);

export default router;
