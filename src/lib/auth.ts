import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecretkey123";

export const signToken = (email: string) => {
  return jwt.sign({ email }, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
