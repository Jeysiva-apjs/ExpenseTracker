import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import apiClient from "./api-client";
import "./styles.css";

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
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsInitialLoading(true);
    apiClient
      .get("/expense/expenses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          return;
        }
        setExpenses(res.data);
        setError("");
        setIsInitialLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsInitialLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    apiClient
      .post("/expense/add", expenseFormData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setIsLoading(false);
          return;
        }
        setExpenses([...expenses, res.data]);
        setExpenseFormData({
          description: "",
          amount: 0,
          category: "",
        });
        setError("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const deleteExpense = (id: string) => {
    const originalData = [...expenses];
    const filteredData = expenses.filter((data) => data._id !== id);
    setExpenses(filteredData);

    apiClient
      .delete(`/expense/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
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

        {isLoading ? (
          <Button
            variant="contained"
            style={{ backgroundColor: "black", minWidth: "64px" }}
          >
            <CircularProgress size={25} />
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            onClick={handleSubmit}
          >
            Add Expense
          </Button>
        )}

        {isInitialLoading && (
          <div style={{ marginTop: "50px" }}>
            <Box sx={{ width: 400 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>
        )}

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
