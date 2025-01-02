import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const isUserBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await User.findById(req.body);
  } catch (error) {}
};
