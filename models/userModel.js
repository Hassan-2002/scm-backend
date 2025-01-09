import mongoose from "mongoose";
import { USER_ROLES } from "../utils/constants.js";
import { hashPassword } from "../utils/auth.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: USER_ROLES,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const hash = await hashPassword(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("users", userSchema);