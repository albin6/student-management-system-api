import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export const userAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response<any> | void> => {
  const token = req.cookies.userToken;
  if (!token) {
    res.status(401).json({ success: false, message: "No token provided" });
  }
  const ACCESSKEY = process.env.JTW_ACCESS_KEY;
  if (!ACCESSKEY) {
    throw new Error("No Access Key Provided.");
  }
  try {
    const decode = jwt.verify(token, ACCESSKEY);
    (req as AuthenticatedRequest).user = decode as { id: string; role: string };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
