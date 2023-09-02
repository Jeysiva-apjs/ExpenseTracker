import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user";
import expenseRouter from "./routes/expense";
import "dotenv/config";

const app = express();
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://jeysiva-expense-tracker.vercel.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(
  cors({
    origin: ["https://jeysiva-expense-tracker-jeysiva-apjs.vercel.app"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const DB_URL = process.env.DB_URL as string;
const PORT = process.env.PORT;

app.use("/user", userRouter);
app.use("/expense", expenseRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((err) => console.error("Error connecting to DB: " + err));
