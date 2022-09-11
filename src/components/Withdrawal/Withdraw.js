import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { toast, Toaster} from 'react-hot-toast'

import { createWithdrawal } from '../../redux/actions/withdrawals'
import { customerByAccNo } from '../../redux/actions/customers';
import { Field, Form, Formik } from 'formik';


const Withdraws = ({onClose}) => {

  const dispatch = useDispatch()

  const withdraw = useSelector((state) => state.withdrawals)
  const { loading, success, error, message} = withdraw

  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

   const userInfo = localStorage.getItem("userInfo")
    const user = JSON.parse(userInfo)

   const initialValues = {
    accountNumber: '', 
    amount: '',
    postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
  }

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


  const onSubmit = (values, props) => {
    dispatch(createWithdrawal(values))
    setTimeout(() => {

      props.resetForm()
      props.setSubmitting(loading)
    }, 2000)
  }

  const handleAccNumberChange = async (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
    setCustomerName('')
    if (value.length >= 10) {
      const userData = await customerByAccNo(value)
      setCustomerName(userData?.surName + ' ' + userData?.otherNames)
    }
  }
  
  return (
    <>
    <Toaster  />
    <div className='flex justify-center w-full'>
      <Box
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(props) => (
            <Form>

            <Field as={TextField} 
              fullWidth 
              name="accountNumber"
              label='Account Number'
              placeholder="Account Number"
              // onChange={handleAccNumberChange}
              helperText={customerName} 
            />
                
              <Field as={TextField} 
                fullWidth 
                name="amount" 
                label='Amount'
                placeholder="Amount" 
              />
              
              <div className='flex justify-end'>
              <Button type='submit' 
                disabled={props.isSubmitting}
                style={{ background: 'black', borderRadius: '10px', color: 'white' }}
              >
                {props.isSubmitting ? "Loading" : "Submit"}
              </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
    </>
  )
}

export default Withdraws