import jwt from "jsonwebtoken";

export const generateAccessToken = (user: {
  id: string;
  role: string;
}): string => {
  const ACCESSKEY = process.env.JWT_ACCESS_KEY;
  if (!ACCESSKEY) {
    throw new Error("No key provided");
  }
  const token = jwt.sign(user, ACCESSKEY, {
    expiresIn: "1d",
  });
  return token;
};
