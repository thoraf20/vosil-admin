import React, { useState} from 'react'
import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';


const accounts = [
  {
    value: 'interim',
    label: 'interim',
  },
  {
    value: 'fixed',
    label: 'fixed',
  },
];

const StaffDetails = () => {

  const [account, setAccount] = useState(accounts[0].value);

  const handleChange = (event) => {
    setAccount(event.target.value);
  };
  
  return (
    <div className='flex justify-center w-full'>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
        />
         <TextField
          id="outlined-disabled"
          label="Other Name"
        />
         <TextField
          // required
          id="outlined-required"
          label="Email"
        />
        <TextField
          id="outlined-number"
          label="Phone Number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-select-account-type"
          select
          label="Select"
          value={account}
          onChange={handleChange}
          helperText="Please select account type"
        >
          {accounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <div className='flex justify-end'>
      <button
            type="button"
            onClick={'handleSubmit'}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Save
        </button>
      </div>
      </Box>
    </div>
  )
}

export default StaffDetails