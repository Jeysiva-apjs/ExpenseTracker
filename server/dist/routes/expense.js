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
const auth_1 = __importDefault(require("../middleware/auth"));
const zod_1 = __importDefault(require("zod"));
const router = express_1.default.Router();
const schema = zod_1.default.object({
    description: zod_1.default
        .string()
        .min(1, "Description cannot be empty")
        .max(50, "Description must be less tha 50 characters"),
    amount: zod_1.default
        .number({ invalid_type_error: "Amount should be a number" })
        .min(1, "Amount should be greater than zero")
        .max(10000000, "Amount should be less than 1,00,00,000"),
    category: zod_1.default.string().min(1, "Category should be selected"),
});
router.get("/expenses", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const expenses = yield models_1.Expense.find({ userId });
    res.status(200).json(expenses);
}));
router.post("/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = schema.safeParse(req.body);
    if (!parsedInput.success) {
        console.log(parsedInput.error.errors[0].message);
        res.json({ error: parsedInput.error.errors[0].message });
        return;
    }
    const userId = req.headers["userId"];
    const { description, amount, category } = parsedInput.data;
    const newExpense = yield new models_1.Expense({
        description,
        amount,
        category,
        userId,
    });
    yield newExpense.save();
    res.status(200).send(newExpense);
}));
router.delete("/delete/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
}));
exports.default = router;
