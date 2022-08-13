import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';

import { toast, Toaster} from 'react-hot-toast'

import { 
  accounts, maritalStatus, genders,  
  states, alerts
} from '../../utils/index'

import { createCustomer, customerById } from '../../redux/actions/customers'

const CustomerEdit = ({id}) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const addCustomer = useSelector((state) => state.addCustomer)
  const customer = useSelector((state) => state.singleCustomer)

  const { loading, success, error } = addCustomer;
  const { allData } = customer

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
    `Customer Successfully Added.`, { duration: 4000}
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notifyError = () => toast.error(
    `${error}.`, { duration: 4000, position: 'top-right'}
  )

  // const id = localStorage.getItem("userId")
  
  useEffect(() => {
    dispatch(customerById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      notifyError()
    }
    if (success) {
      notify()
    }
  }, [success, error, notifyError, navigate])

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
          value={allData?.surName}
          // onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          required
          id="outlined-required"
          label="OtherNames"
          name='otherNames'
          value={allData?.otherNames}
          // onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />

         <TextField
          id="outlined-required"
          label="Email"
          name='email'
          value={allData?.email}
          // onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
      </div>
      <div>
        <TextField
          id="outlined-number"
          label="Phone Number"
          name='phoneNumber'
          value={allData?.phoneNumber}
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
          value={allData?.accountType}
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
            value={allData?.maritalStatus}
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
            value={allData?.gender}
            // onChange={handleGenderChange}
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
            id="outlined-select-state-of-origin"
            select
            label="Select"
            value={allData?.stateOfOrigin}
            // onChange={handleStateChange}
            size='medium'
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
          value={allData?.residentialAddress}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          required
          id="outlined-required"
          label="Office Address"
          name='officeAddress'
          value={allData?.officeAddress}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />

         <TextField
          id="outlined-disabled"
          label="Occupation"
          name='occupation'
          value={allData?.occupation}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        </div>
       
          <TextField
            id="outlined-select-account-officer"
            select
            label="Alert"
            value={allData?.alert}
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
            value={allData?.nextOfKin}
            onChange={handleChange}
            size='medium'
            style={{width: "30%"}}
          />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Relationship"
          name='nextOfKinRelationship'
          value={allData?.nextOfKinRelationship}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Address"
          name='nextOfKinAddress'
          value={allData?.nextOfKinAddress}
          onChange={handleChange}
          size='medium'
          style={{width: "30%"}}
        />
        <TextField
          id="outlined-disabled"
          label="Next Of Kin Phone No"
          name='nextOfKinPhoneNumber'
          value={allData?.nextOfKinPhoneNumber}
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
            {loading ? 'Updating' : 'Update'}
        </button>  
      </div>
      </Box>
    </div>
    </>
  )
}

export default CustomerEdit