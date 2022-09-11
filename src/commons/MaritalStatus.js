import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";
import { maritalStatus } from "../utils";

const MaritalStatusSelect = ({ label, menu, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        {...field}
        {...props}
        select
        >
          {maritalStatus.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
          ))}
        </TextField>
    </>
  );
};

export default MaritalStatusSelect;