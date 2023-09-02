import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import categories from "../categories";
import { FormType } from "./ExpenseTracker";
import "./styles.css";

interface Props {
  expenseFormData: FormType;
  setExpenseFormData: (data: FormType) => void;
}

const ExpenseForm = ({ expenseFormData, setExpenseFormData }: Props) => {
  return (
    <>
      <div className="body">
        <h1 className="title" style={{ margin: 0 }}>
          Expense Tracker
        </h1>
        <p className="quote">Track, Manage and Control</p>

        <TextField
          id="description"
          label="Description"
          variant="outlined"
          className="textBox"
          value={expenseFormData.description}
          onChange={(event) =>
            setExpenseFormData({
              ...expenseFormData,
              description: event.target.value,
            })
          }
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          className="textBox"
          value={expenseFormData.amount}
          onChange={(event) =>
            setExpenseFormData({
              ...expenseFormData,
              amount: /^\d+$/.test(event.target.value)
                ? parseInt(event.target.value)
                : 0,
            })
          }
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={expenseFormData.category}
              onChange={(event) =>
                setExpenseFormData({
                  ...expenseFormData,
                  category: event.target.value,
                })
              }
              className="textBox"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default ExpenseForm;
