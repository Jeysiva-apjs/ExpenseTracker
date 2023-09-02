"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../database/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const zod_1 = require("zod");
const SECRET = process.env.SECRET;
const router = express_1.default.Router();
const signupInput = zod_1.z.object({
    userName: zod_1.z
        .string()
        .min(3, "User name must be atleast 3 characters")
        .max(50, "User name must be less than 50 characters"),
    password: zod_1.z
        .string()
        .min(8, "Password must be atleast 8 characters")
        .max(50, "Password must be less than 50 characters"),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        console.log(parsedInput.error.errors[0].message);
        res.json({ error: parsedInput.error.errors[0].message });
        return;
    }
    const userName = parsedInput.data.userName;
    const password = parsedInput.data.password;
    const existingUser = yield models_1.User.findOne({ userName: userName });
    if (existingUser) {
        res.json({ error: "User already exists" });
    }
    else {
        const newUser = new models_1.User({ userName, password });
        yield newUser.save();
        console.log(newUser);
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, SECRET, { expiresIn: "1hr" });
        res
            .status(201)
            .json({ message: "User created successfully", token: token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield models_1.User.findOne({ userName, password });
    if (!user) {
        res.json({ error: "Invalid user name or password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, SECRET, { expiresIn: "1hr" });
    res.status(200).json({ message: "Logged in successfully", token: token });
}));
exports.default = router;
