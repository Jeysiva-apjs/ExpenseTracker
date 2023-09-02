"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const expense_1 = __importDefault(require("./routes/expense"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://jeysiva-expense-tracker.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204, // This is important for preflight requests
}));
app.use(express_1.default.json());
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
app.use("/user", user_1.default);
app.use("/expense", expense_1.default);
mongoose_1.default
    .connect(DB_URL)
    .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log("server is running on port " + PORT);
    });
})
    .catch((err) => console.error("Error connecting to DB: " + err));
