import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpenseType } from "./index";
import ExpenseFilter from "./ExpenseFilter";
import "./styles.css";
import Chart from "./Chart";

interface Props {
  expenses: ExpenseType[];
  deleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, deleteExpense }: Props) {
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(
        expenses.filter((data) => data.category === filterCategory)
      );
    }
  }, [filterCategory, expenses]);

  return (
    <>
      <div className="formList">
        <div>
          <ExpenseFilter
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          ></ExpenseFilter>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 350 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <StyledTableRow key={expense._id}>
                    <StyledTableCell component="th" scope="row">
                      {expense.description}
                    </StyledTableCell>
                    <StyledTableCell>{expense.amount}</StyledTableCell>
                    <StyledTableCell>{expense.category}</StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        onClick={() => deleteExpense(expense._id)}
                      ></DeleteIcon>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow style={{ backgroundColor: "black" }}>
                  <StyledTableCell
                    style={{ color: "white", fontWeight: "450" }}
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ color: "white", fontWeight: "450" }}
                  >
                    {filteredExpenses.reduce(
                      (acc, expense) => acc + expense.amount,
                      0
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Chart
            filteredExpenses={filteredExpenses}
            filterCategory={filterCategory}
          ></Chart>
        </div>
      </div>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
