import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { toast, Toaster} from 'react-hot-toast'
import { createSavings } from '../../redux/actions/savings'
import { customerByAccNo } from '../../redux/actions/customers';

const Saving = () => {

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.customerData)

  const { userData } = userDetails;

  const saving = useSelector((state) => state.addSavings)
  const { loading, success, error, allData } = saving

  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

  const { 
    pageNo,
    accountNumber, 
    amount, 
   } = state

   const notify = () => toast.success(
    `${allData.msg}`, { duration: 7000}
  )

  const notifyError = () => toast.error(
    `${error}`, { duration: 7000, position: 'top-right'}
  )

  useEffect(() => {
    if (error) {
      notifyError()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
  };

  const handleAccNumberChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
    if (value.length >= 10) {
      dispatch(customerByAccNo(value))
    }
    setCustomerName(userData?.surName + ' ' + userData?.otherNames)
  };

  const userInfo = localStorage.getItem("userInfo")
  const user = JSON.parse(userInfo)

  const handleSubmit = async () => {
    const requestData = {
      pageNo, 
      accountNumber, 
      amount, 
      postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
    }
    dispatch(createSavings(requestData))
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
          label="PageNo"
          name='pageNo'
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

export default Saving