import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { ExpenseType } from "./ExpenseTracker";
import { Typography } from "@mui/material";

interface Chart {
  groceries: number;
  utilities: number;
  entertainment: number;
}

interface Props {
  filterCategory: string;
  filteredExpenses: ExpenseType[];
}

export default function Chart({ filteredExpenses, filterCategory }: Props) {
  const [values, setValues] = useState<Chart>({
    groceries: 0,
    utilities: 0,
    entertainment: 0,
  });

  useEffect(() => {
    const total = filteredExpenses.reduce((a, b) => a + b.amount, 0);
    const value1 = filteredExpenses
      .filter((expense) => expense.category === "Groceries")
      .reduce((a, b) => a + b.amount, 0);
    const value2 = filteredExpenses
      .filter((expense) => expense.category === "Utilities")
      .reduce((a, b) => a + b.amount, 0);
    const value3 = filteredExpenses
      .filter((expense) => expense.category === "Entertainment")
      .reduce((a, b) => a + b.amount, 0);

    setValues({
      groceries: (value1 / total) * 100,
      utilities: (value2 / total) * 100,
      entertainment: (value3 / total) * 100,
    });
  }, [filteredExpenses, filterCategory]);

  if (filterCategory !== "All") {
    return null; // Return null if the filterCategory is not "All"
  }

  return (
    <>
      <div className="body chart">
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: parseFloat(values.groceries.toFixed(0)),
                  label: "Groceries",
                },
                {
                  id: 1,
                  value: parseFloat(values.utilities.toFixed(0)),
                  label: "Utilities",
                },
                {
                  id: 2,
                  value: parseFloat(values.entertainment.toFixed(0)),
                  label: "Entertainment",
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
        <div className="chart-labels">
          {[
            { label: "Groceries", value: values.groceries },
            { label: "Utilities", value: values.utilities },
            { label: "Entertainment", value: values.entertainment },
          ].map((item, index) => (
            <Typography key={index} variant="body2">
              {item.label}: {item.value.toFixed(0)}%
            </Typography>
          ))}
        </div>
      </div>
    </>
  );
}
