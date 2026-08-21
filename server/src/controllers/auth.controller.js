import { asyncHandler } from "../middlewares/asyncHandler.js";
import * as authService from "../services/auth.service.js";

const COOKIE_OPTIONS = {
  // httpOnly: true,
  secure: false,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = asyncHandler(async (req, res) => {
  const { user, refreshToken, accessToken } = await authService.register(
    req.body,
  );

  // set RT in cookie
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  // send AT & user profile in res
  res.status(201).json({
    user,
    accessToken,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { refreshToken, user, accessToken } = await authService.login(req.body);

  // set RT in cookie
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  // send AT & user profile in res
  res.status(200).json({
    user,
    accessToken,
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  // console.log("cookies", req.cookies);
  const incomingToken = req.cookies?.refreshToken;
  const result = await authService.refreshAccessToken(incomingToken);

  // new access token in body
  res.status(200).json(result);
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user?._id);

  // clear cookie
  res.clearCookie("refreshToken", COOKIE_OPTIONS);

  res.status(200).json({ message: "Logged out successfully" });
});
