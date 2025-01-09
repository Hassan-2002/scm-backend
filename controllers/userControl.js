import User from "../models/userModel.js";
import { USER_ROLES } from "../utils/constants.js";
import { generateToken, comparePass, hashPassword } from "../utils/auth.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const registerUser = async (req, res) => {
  try {
    const data = { ...req.body };
    data.createdAt = new Date();
    data.role = USER_ROLES[data?.role ? data?.role : 3];
    const newUser = new User(data);
    await newUser.save();
    res.status(201).json({ success: true, message: "User Created Successfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found!" });
    }
    const validPassword = await comparePass(data.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid Credentials!" });
    } else {
      const token = await generateToken({ email: user.email, role: user.role, fullName: user.fullName });
      let usr = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(200).json({
        success: true,
        message: "Login Successful!",
        user: usr,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = req.body?.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found!" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; /// 1 Hour Expiration Time
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Link! - SCMS",
      message: "Password Reset Link! - SCMS",
      html: `<p>You requested a password reset</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
    res.status(200).json({ message: "Password reset email sent" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

const updateResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

export { registerUser, login, resetPassword, updateResetPassword };