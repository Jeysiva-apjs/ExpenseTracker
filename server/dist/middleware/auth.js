"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET = process.env.SECRET;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
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
exports.default = authenticateJwt;
