import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { toast, Toaster} from 'react-hot-toast'

import { createWithdrawal } from '../../redux/actions/withdrawals'
import { customerByAccNo } from '../../redux/actions/customers';


const Withdraws = ({onClose}) => {

  const dispatch = useDispatch()

  const withdraw = useSelector((state) => state.withdrawals)
  const { loading, success, error, message} = withdraw

  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

  const { 
    accountNumber, 
    amount, 
   } = state

  const notifySuccess = () => toast.success(
    `${message}`,
   {duration: 7000}
  )

  const notifyFailure = () => toast.error(
    `${error}`, {duration: 7000}
  )

  useEffect(() => {
    if (error) {
      notifyFailure()
    }
    if (success) {
      notifySuccess()
    }
   
  }, [error, success])

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
    }
    dispatch(createWithdrawal(requestData))
    setTimeout(() => {
      onClose()
    }, "4000")
  }
  
  return (
    <>
    <Toaster  />
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

      </div>
      <div className='flex justify-end'>
      <button
            type="button"
            onClick={handleSubmit}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            {loading ? 'Submitting' : 'Submit'}
        </button>
      </div>
      </Box>
    </div>
    </>
  )
}

export default Withdraws