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

const maritalStatus = [
  {
    value: 'single',
    label: 'single',
  },
  {
    value: 'married',
    label: 'married',
  },
];

const genders = [
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
];

const nationality = [
  {
    value: 'Nigeria',
    label: 'Nigeria',
  },
  {
    value: 'Ghana',
    label: 'Ghana',
  },
];

const states = [
  {
    value: 'lagos',
    label: 'lagos',
  },
  {
    value: 'ogun',
    label: 'ogun',
  },
];

const employment = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  },
];

const alerts = [
  {
    value: 'every transaction',
    label: 'every transaction',
  },
  {
    value: 'weekly',
    label: 'weekly',
  },
  {
    value: 'monthly',
    label: 'monthly',
  },
];
const CustomerDetails = () => {

  const [page, setPage] = useState(1)
  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }

  const [account, setAccount] = useState(accounts[0].value);

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  const [status, setStatus] = useState(maritalStatus[0].value);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [gender, setGender] = useState(genders[0].value);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  
  const [state, setState] = useState(states[0].value);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const [country, setCountry] = useState(nationality[0].value);
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const [selfEmploy, setSelfEmployment] = useState(employment[0].value);

  const handleEmploymentChange = (event) => {
    setSelfEmployment(event.target.value);
  };

  const [alert, setAlert] = useState(alerts[0].value);

  const handleAlertsChange = (event) => {
    setAlert(event.target.value);
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
    {page === 1 ? (
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
          id="outlined-select-account-officer"
          select
          label="Select"
          value={status}
          onChange={handleStatusChange}
          helperText="Please select marital status"
        >
          {maritalStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-account-officer"
          select
          label="Select"
          value={gender}
          onChange={handleGenderChange}
          helperText="Please select gender"
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-account-officer"
          select
          label="Select"
          value={country}
          onChange={handleCountryChange}
          helperText="Please select country"
        >
          {nationality.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-account-officer"
          select
          label="Select"
          value={state}
          onChange={handleStateChange}
          helperText="Please select state"
        >
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      ) : (
        <div>
        <TextField
          required
          id="outlined-required"
          label="Residential Address"
        />
        <TextField
          required
          id="outlined-required"
          label="Office Address"
        />
         <TextField
          id="outlined-disabled"
          label="Occupation"
        />
        <TextField
          id="outlined-select-account-type"
          select
          label="Employment"
          value={selfEmploy}
          onChange={handleEmploymentChange}
          helperText="Please select account type"
        >
          {employment.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-disabled"
          label="Nearest Bustop"
        />
        <TextField
          id="outlined-disabled"
          label="Land Mark"
        />
        <TextField
          id="outlined-select-account-officer"
          select
          label="Alert"
          value={alert}
          onChange={handleAlertsChange}
          helperText="Please select marital status"
        >
          {alerts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-disabled"
          label="Next Of Kin"
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Relationship"
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Address"
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Phone No"
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Email"
        />
      </div>
      )}
      <div className='flex justify-between'>
      {page === 1 ? '' : ( <button
            type="button"
            onClick={previousPage}
            style={{ background: 'black', borderRadius: '10px' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Previous
        </button>
        )}
       
       {page === 2 ? (
         <button
            type="button"
            onClick={nextPage}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Save
        </button>
        ): (
          <button
            type="button"
            onClick={nextPage}
            style={{ background: 'black', borderRadius: '10px' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Next
        </button>
        )}
        
      </div>
      </Box>
    </div>
  )
}

export default CustomerDetails