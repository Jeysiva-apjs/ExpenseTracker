import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import "./styles.css";
import axios from "axios";

export interface ExpenseType {
  _id: string;
  description: string;
  amount: number;
  category: string;
  userId: string;
}

export interface FormType {
  description: string;
  amount: number;
  category: string;
}
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [expenseFormData, setExpenseFormData] = useState<FormType>({
    description: "",
    amount: 0,
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "jeysiva-expense-tracker-server-nqxdqrkzi-jeysiva-apjs.vercel.app/expense/expenses",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        }
        setExpenses(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        "jeysiva-expense-tracker-server-nqxdqrkzi-jeysiva-apjs.vercel.app/expense/add",
        expenseFormData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          return;
        }
        setExpenses([...expenses, res.data]);
        setExpenseFormData({
          description: "",
          amount: 0,
          category: "",
        });
      })
      .catch((err) => console.error(err));
  };

  const deleteExpense = (id: string) => {
    const originalData = [...expenses];
    const filteredData = expenses.filter((data) => data._id !== id);
    setExpenses(filteredData);

    axios
      .delete(
        `jeysiva-expense-tracker-server-nqxdqrkzi-jeysiva-apjs.vercel.app/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        console.log(err.message);
        setExpenses(originalData);
      });
  };

  if (error === "Unauthorized") {
    return (
      <>
        <h1>404 Not Found</h1>
      </>
    );
  }
  return (
    <>
      <div className="body">
        <ExpenseForm
          expenseFormData={expenseFormData}
          setExpenseFormData={setExpenseFormData}
        ></ExpenseForm>
        {error && <p className="errorMsg">{error}</p>}
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          onClick={handleSubmit}
        >
          Add Expense
        </Button>
        {expenses.length !== 0 && (
          <div className="data">
            <ExpenseList
              expenses={expenses}
              deleteExpense={deleteExpense}
            ></ExpenseList>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpenseTracker;
