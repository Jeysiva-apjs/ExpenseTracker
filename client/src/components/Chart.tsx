import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { ExpenseType } from "./ExpenseTracker";
import { DefaultizedPieValueType } from "@mui/x-charts";

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
    return;
  }

  const data = [
    {
      label: "Groceries",
      value: values.groceries,
      color: "#0088FE",
    },
    {
      label: "Utilities",
      value: values.utilities,
      color: "#00C49F",
    },
    {
      label: "Entertainment",
      value: values.entertainment,
      color: "#FFBB28",
    },
  ];

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };

  const getArcLabel = (params: DefaultizedPieValueType) => {
    return `${params.value.toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      {...sizing}
    />
  );
}
