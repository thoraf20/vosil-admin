import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import { toast, Toaster} from 'react-hot-toast'

import { createWithdrawal } from '../../redux/actions/withdrawals'
import { CREATE_WITHDRAWAL_RESET } from '../../redux/constants/withdrawals';
import { formatCurrency } from '../../utils';

const Withdraws = () => {

  const dispatch = useDispatch()

  const withdraw = useSelector((state) => state.addWithdrawal)
  const { loading, success, error, allData} = withdraw

  const [state, setState] = useState('')

  const { 
    accountNumber, 
    amount, 
   } = state

  const notifySuccess = () => toast.success(
    `Withdrawal of ${formatCurrency(allData.amount)} Successful.`,
   {duration: 6000}
  )

  const notifyFailure = () => toast.error(
    `${error}`, {duration: 6000}
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

  const userInfo = localStorage.getItem("userInfo")
  const user = JSON.parse(userInfo)

  const handleSubmit = async () => {
    const requestData = {
    accountNumber, 
    amount, 
    postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
    }
    dispatch(createWithdrawal(requestData))
    dispatch({
      type: CREATE_WITHDRAWAL_RESET
    })
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
          onChange={handleChange}
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