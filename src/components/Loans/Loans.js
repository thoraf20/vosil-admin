import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import { Button, MenuItem, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik'

import { toast, Toaster} from 'react-hot-toast'

import { createLoan } from '../../redux/actions/loan'
import { durations } from '../../utils';
import { customerByAccNo } from '../../redux/actions/customers';
import CustomSelect from '../../commons/CustomSelect';


const PostLoan = ({onClose}) => {
  const dispatch = useDispatch()

  const loan = useSelector((state) => state.loans)
  const { loading, success, error, message } = loan
  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

  const [duration, setDuration] = useState(durations[0].value);


  const userInfo = localStorage.getItem("userInfo")
  const user = JSON.parse(userInfo)

  const initialValues = {
    accountNumber: '', 
    amount: '', 
    duration: '',
    postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
  }

  const notify = () => toast.success(` ${message}`, {duration: 6000})
  
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


  const handleDurationsChange = (event) => {
    event.preventDefault()
    setDuration(event.target.value);
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


  const onSubmit = (values, props) => {
    dispatch(createLoan(values))
    setTimeout(() => {

      props.resetForm()
      props.setSubmitting(loading)
    }, 2000)
  }
  
  return (
    <>
    <Toaster />
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
              label="Account Number"
              // onChange={handleAccNumberChange}
              helperText={customerName}
            />
              
            <Field as={TextField} 
              fullWidth 
              name="amount"
              label='Amount'
              placeholder="Amount" 
            />

            <CustomSelect
              label='Duration'
              name="duration"
              value={duration}
              helperText="Please select a duration"
            >
              {durations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
            
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

export default PostLoan