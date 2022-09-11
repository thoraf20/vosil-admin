import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";
import { accounts } from "../utils";

const AccountTypeSelect = ({ label, menu, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        {...field}
        {...props}
        select
        >
          {accounts.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
          ))}
        </TextField>
    </>
  );
};

export default AccountTypeSelect;