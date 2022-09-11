import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";
import { durations } from "../utils";

const CustomSelect = ({ label, menu, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        {...field}
        {...props}
        select
        >
          {durations.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
          ))}
        </TextField>
    </>
  );
};

export default CustomSelect;
