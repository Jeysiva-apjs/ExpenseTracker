import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  userId: String,
});

const User = mongoose.model("User", userSchema);
const Expense = mongoose.model("Expense", expenseSchema);

export { User, Expense };
