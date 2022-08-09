import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';

import { toast, Toaster} from 'react-hot-toast'

import { 
  accounts, maritalStatus, genders,  
  states, alerts
} from '../../utils/index'

import { createCustomer } from '../../redux/actions/customers'

const CustomerDetails = () => {

  const dispatch = useDispatch()
  const customer = useSelector((state) => state.addCustomer)
  const { loading, success, error, allData } = customer  

  console.log(allData)
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

  const { 
    surName, otherNames, category,
    email, phoneNumber, occupation,
    residentialAddress, officeAddress, 
    nextOfKin, nextOfKinRelationShip, 
    nextOfKinAddress, nextOfKinPhoneNumber
  } = data

  const user = localStorage.getItem("userInfo")
  const accOfficer = JSON.parse(user)

  const notify = () => toast.success(
    `Customer Successfully Added.`, { duration: 6000}
  )

  const notifyError = () => toast.error(
    `${error}.`, { duration: 6000, position: 'top-right'}
  )

  useEffect(() => {
    if (error) {
      notifyError()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const handleSubmit = async () => {
    const requestData = {
      surName, 
      otherNames, 
      email, 
      phoneNumber,
      accountType: account,
      accountOfficer: accOfficer.userExist.surName  + ' ' + accOfficer.userExist.otherNames,
      maritalStatus: status,
      gender,
      category,
      stateOfOrigin: state,
      residentialAddress,
      officeAddress,
      occupation,
      alert,
      nextOfKin,
      nextOfKinRelationShip,
      nextOfKinAddress,
      nextOfKinPhoneNumber
    }

    dispatch(createCustomer(requestData))
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
      <div className='flex justify-between'>
        <TextField
          required
          id="outlined-required"
          label="SurName"
          name='surName'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          required
          id="outlined-required"
          label="OtherNames"
          name='otherNames'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />

         <TextField
          id="outlined-required"
          label="Email"
          name='email'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
      </div>
      <div>
        <TextField
          id="outlined-number"
          label="Phone Number"
          name='phoneNumber'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />

        <TextField
          id="outlined-select-account-type"
          select
          label="Select"
          value={account}
          onChange={handleAccountChange}
          size='medium'
          helperText="Please select account type"
          style={{width: "30%"}}
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
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        </div>
        <div>
          <TextField
            id="outlined-select-account-officer"
            select
            label="Select"
            value={status}
            onChange={handleStatusChange}
            size='medium'
            style={{width: "30%"}}
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
            size='medium'
            style={{width: "30%"}}
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
            value={state}
            onChange={handleStateChange}
            ssize='medium'
            style={{width: "30%"}}
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
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          required
          id="outlined-required"
          label="Office Address"
          name='officeAddress'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />

         <TextField
          id="outlined-disabled"
          label="Occupation"
          name='occupation'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        </div>
       
          <TextField
            id="outlined-select-account-officer"
            select
            label="Alert"
            value={alert}
            onChange={handleAlertsChange}
            size='medium'
            style={{width: "30%"}}
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
            onChange={handleChange}
            size='medium'
            style={{width: "30%"}}
          />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Relationship"
          name='nextOfKinRelationship'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Address"
          name='nextOfKinAddress'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Phone No"
          name='nextOfKinPhoneNumber'
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        
      <div className='flex justify-end'>
         <button
            type="button"
            onClick={handleSubmit}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            {loading ? 'Saving' : 'Save'}
        </button>  
      </div>
      </Box>
    </div>
    </>
  )
}

export default CustomerDetails