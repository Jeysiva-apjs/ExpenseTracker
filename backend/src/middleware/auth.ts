import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

const SECRET = process.env.SECRET as string;

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, payload: any) => {
    if (err) {
      return res.json({ error: "Unauthorized" });
    }
    if (!payload) {
      return res.json({ error: "Unauthorized" });
    }

    req.headers["userId"] = payload.id;
    next();
  });
};

export default authenticateJwt;
