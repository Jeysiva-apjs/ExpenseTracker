import express from "express";
import { Expense } from "../database/models";
import authenticateJwt from "../middleware/auth";
import z from "zod";

const router = express.Router();

const schema = z.object({
  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(50, "Description must be less tha 50 characters"),
  amount: z
    .number({ invalid_type_error: "Amount should be a number" })
    .min(1, "Amount should be greater than zero")
    .max(10000000, "Amount should be less than 1,00,00,000"),
  category: z.string().min(1, "Category should be selected"),
});

router.get("/expenses", authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const expenses = await Expense.find({ userId });
  res.status(200).json(expenses);
});

router.post("/add", authenticateJwt, async (req, res) => {
  const parsedInput = schema.safeParse(req.body);

  if (!parsedInput.success) {
    console.log(parsedInput.error.errors[0].message);
    res.json({ error: parsedInput.error.errors[0].message });
    return;
  }

  const userId = req.headers["userId"];
  const { description, amount, category } = parsedInput.data;
  const newExpense = await new Expense({
    description,
    amount,
    category,
    userId,
  });
  await newExpense.save();
  res.status(200).send(newExpense);
});

router.delete("/delete/:id", authenticateJwt, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Expense deleted successfully" });
});

export default router;
