import { Response } from "express";

export function set_token(
  token_name: string,
  token: string,
  max_age: number,
  res: Response
) {
  res.cookie(token_name, token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: max_age,
  });
}
