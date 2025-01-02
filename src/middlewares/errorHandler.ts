import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: Error | null,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err?.message || "Internal server error";

  res.status(statusCode).json({ success: false, message });
}

export function createAppError(message: string, statusCode: number): AppError {
  return new AppError(message, statusCode);
}
