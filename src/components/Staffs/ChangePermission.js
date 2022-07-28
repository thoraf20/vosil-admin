import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';
import { accounts, roles } from '../../utils/index'

import { toast, Toaster} from 'react-hot-toast'

import { staffsByIdData, updateStaffData } from '../../redux/actions/staffs'

const UpdateStaffDetails = () => {
const id = localStorage.getItem('userId');
  const dispatch = useDispatch()
  const staff = useSelector((state) => state.staffById)
  const updatedStaff = useSelector((state) => state.updateStaff)
  
  const { loading, allData} = staff;
  const { success, error } = updatedStaff;

  const [account, setAccount] = useState(accounts[0].value);
  const [role, setRole] = useState(roles[0].value);
  const [state, setState] = useState('')

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRole(event.target.value);
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
  };

  useEffect(() => {
    dispatch(staffsByIdData(id))
  }, [])

  const { phoneNumber } = state

  const notify = () => toast.success(` Staff Details Updated Successfully.`, {duration: 6000})
  const notifyFailure = () => toast.error(
    `Unable To Update Staff Details.`, {duration: 6000}
    )
  useEffect(() => {
    if (error) {
      notifyFailure()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const handleSubmit = async () => {
    const requestData = { 
      phoneNumber,
      accountType: account,
      role,
    }
    dispatch(updateStaffData(id, requestData))
  }

  return (
    <>
    <Toaster />
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
            label="SurName"
            value={allData?.surName}
            />

          <TextField
            required
            id="outlined-required"
            label="OtherNames"
            value={allData?.otherNames}
            />

          <TextField
            required
            id="outlined-required"
            label="Email"
            // name='email'
            value={allData?.email}
            // onChange={handleChange}

            />

          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name='password'
            onChange={handleChange} />
            
          <TextField
            required
            id="outlined-number"
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            name='phoneNumber'
            value={allData?.phoneNumber}
            onChange={handleChange} />

          <TextField
            id="outlined-select-account-type"
            select
            label="Select"
            value={account}
            onChange={handleAccountChange}
            helperText="Please select account type"
          >
            {accounts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-account-type"
            select
            label="Select"
            value={role}
            onChange={handleRolesChange}
            helperText="Please select staff role"
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </div>
        <div className='flex justify-end'>
          <button
            type="button"
            onClick={handleSubmit}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </Box>
    </div>
    </>
  )
}

export default UpdateStaffDetails