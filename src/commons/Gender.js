import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";
import { genders } from "../utils";

const GenderSelect = ({ label, menu, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        {...field}
        {...props}
        select
        >
          {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
          ))}
        </TextField>
    </>
  );
};

export default GenderSelect;