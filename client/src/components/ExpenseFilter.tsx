import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import categories from "../categories";

interface Props {
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}

const ExpenseFilter = ({ filterCategory, setFilterCategory }: Props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className="textbox">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterCategory}
          label="Category"
          onChange={(event) => setFilterCategory(event.target.value)}
          className="textbox"
        >
          <MenuItem value={"All"}>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExpenseFilter;
