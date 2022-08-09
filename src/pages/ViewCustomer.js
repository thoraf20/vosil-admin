import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';
import { 
  accounts, maritalStatus, genders,  
  states, alerts
} from '../utils/index'
import { IoArrowBack } from "react-icons/io5";

import { customerById } from '../redux/actions/customers'

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const customer = useSelector((state) => state.singleCustomer)
  const { loading, success, allData} = customer ;

  const [account, setAccount] = useState(accounts[0].value);

  const handleAccountChange = (event) => {
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

  const [alert, setAlert] = useState(alerts[0].value);

  const handleAlertsChange = (event) => {
    setAlert(event.target.value);
  };

  const [data, setData ] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({...data, [name]: value});
  };

  useEffect(() => {
    dispatch(customerById(id))
  }, [])

  return (
    <>
    <div className='flex justify-center w-full'>
      <div className='cursor-pointer'>
        <IoArrowBack
          onClick={() => navigate("/customers")}
        />
      </div>
    {loading ? 'loading...' : (
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
          name='surName'
          value={allData?.surName}
          onChange={handleChange}
          size='small'
        />
        <TextField
          required
          id="outlined-required"
          label="OtherNames"
          name='otherNames'
          value={allData?.otherNames}
          onChange={handleChange}
          size='small'

        />

         <TextField
          // required
          id="outlined-required"
          label="Email"
          name='email'
          value={allData?.email}
          onChange={handleChange}
          size='small'

        />

        <TextField
          id="outlined-number"
          label="Phone Number"
          name='phoneNumber'
          value={allData?.phoneNumber}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          size='small'
        />

        <TextField
          id="outlined-select-account-type"
          select
          label="Select"
          value={allData?.account}
          onChange={handleAccountChange}
          size='small'
          helperText="Please select account type"
        >
          {accounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined"
          label="Category"
          name='category'
          value={allData?.category}
          onChange={handleChange}
          size='small'
        />

        <TextField
          id="outlined-select-account-officer"
          select
          label="Select"
          value={allData?.status}
          onChange={handleStatusChange}
          size='small'
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
          value={allData?.gender}
          onChange={handleGenderChange}
          size='small'
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
          value={allData?.state}
          onChange={handleStateChange}
          size='small'
          helperText="Please select state"
        >
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* ) : ( */}
        <div>
        <TextField
          required
          id="outlined-required"
          label="Residential Address"
          name='residentialAddress'
          value={allData?.residentialAddress}
          onChange={handleChange}
          size='small'
        />
        <TextField
          required
          id="outlined-required"
          label="Office Address"
          name='officeAddress'
          value={allData?.officeAddress}
          onChange={handleChange}
          size='small'
        />

         <TextField
          id="outlined-disabled"
          label="Occupation"
          name='occupation'
          value={allData?.occupation}
          onChange={handleChange}
          size='small'
        />
       
        <TextField
          id="outlined-select-account-officer"
          select
          label="Alert"
          value={allData?.alert}
          onChange={handleAlertsChange}
          size='small'
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
          name='nextOfKin'
          value={allData?.nextOfKin}
          onChange={handleChange}
          size='small'

        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Relationship"
          name='nextOfKinRelationship'
          value={allData?.nextOfKinRelationship}
          onChange={handleChange}
          size='small'

        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Address"
          name='nextOfKinAddress'
          value={allData?.nextOfKinAddress}
          alert
          onChange={handleChange}
          size='small'

        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Phone No"
          name='nextOfKinPhoneNumber'
          value={allData?.nextOfKinPhoneNumber}
          onChange={handleChange}
          size='small'
        />
        
      </div>
      {/* <div className='flex justify-end'>
         <button
            type="button"
            onClick={handleSubmit}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            {loading ? 'Saving' : 'Save'}
        </button>  
      </div> */}
      </Box>
      )}
    </div>
    </>
  )
}

export default CustomerDetails