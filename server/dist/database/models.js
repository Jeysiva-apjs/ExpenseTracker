"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: String,
    password: String,
});
const expenseSchema = new mongoose_1.default.Schema({
    description: String,
    amount: Number,
    category: String,
    userId: String,
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Expense = mongoose_1.default.model("Expense", expenseSchema);
exports.Expense = Expense;
