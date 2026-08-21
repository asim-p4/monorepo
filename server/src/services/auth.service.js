import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

export async function register(userData) {
  const { email, name, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("email already register");
    error.statusCode = 409;
    throw error;
  }

  const user = new User({
    name,
    email,
    password,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    accessToken,
    refreshToken,
  };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // use schema method to compare pass
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    accessToken,
    refreshToken,
  };
}

export async function refreshAccessToken(incomingRefreshToken) {
  if (!incomingRefreshToken) {
    const error = new Error("Unauthorized: Refresh token is required");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  // console.log(decoded);

  // verify token in db
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== incomingRefreshToken) {
    const error = new Error("refresh token is invalid or has been revoked");
    error.statusCode = 403;
    throw error;
  }

  const newAccessToken = generateAccessToken(user);

  return {
    accessToken: newAccessToken,
  };
}

export async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}
