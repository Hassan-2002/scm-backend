import express from "express"
import {login, registerUser, resetPassword, updateResetPassword} from '../controllers/userControl.js';

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/update-password", updateResetPassword);

export default router;