import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';

import { toast, Toaster} from 'react-hot-toast'

import { createLoan } from '../../redux/actions/loan'
import { durations } from '../../utils';
import { customerByAccNo } from '../../redux/actions/customers';


const PostLoan = () => {
  const dispatch = useDispatch()

  const loan = useSelector((state) => state.addLoan)
  const { loading, success, error, allData} = loan

  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

  const {
    accountNumber, 
    amount, 
   } = state

  const notify = () => toast.success(` ${allData.msg}.`, {duration: 6000})
  const notifyFailure = () => toast.error(
    `${error}`, {duration: 6000}
    )

  useEffect(() => {
    if (error) {
      notifyFailure()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const [duration, setDuration] = useState(durations[0].value);

  const handleDutaionsChange = (event) => {
    setDuration(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
  };

  const handleAccNumberChange = async (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
    setCustomerName('')
    if (value.length >= 10) {
      const userData = await customerByAccNo(value)
      setCustomerName(userData?.surName + ' ' + userData?.otherNames)
    }
  }

  const userInfo = localStorage.getItem("userInfo")
  const user = JSON.parse(userInfo)

  const handleSubmit = async () => {
    const requestData = {
    accountNumber, 
    amount, 
    postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
    duration
    }
    dispatch(createLoan(requestData))
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
          label="Account Number"
          name='accountNumber'
          onChange={handleAccNumberChange}
          helperText={customerName}
        />
        <TextField
          required
          id="outlined-required"
          label="Amount"
          name='amount'
          onChange={handleChange}
        />

        <TextField
          id="outlined-select"
          select
          label="Duration"
          value={duration}
          onChange={handleDutaionsChange}
          helperText="select loan duration"
        >
          {durations.map((option) => (
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
            {loading ? 'Submtting...' : 'Submit'}
        </button>
      </div>
      </Box>
    </div>
    </>
  )
}

export default PostLoan