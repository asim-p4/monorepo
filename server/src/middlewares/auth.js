import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Unauthorized: Access token is required");
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error(
        "Unauthorized: User belonging to this token no longer exists",
      );
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      const error = new Error(`Unauthorized: ${err.message}`);
      error.statusCode = 401;
      return next(error);
    }
    next(err);
  }
}
