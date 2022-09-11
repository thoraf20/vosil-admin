import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box } from '@mui/material'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { toast, Toaster} from 'react-hot-toast'
import { createSavings } from '../../redux/actions/savings'
import { customerByAccNo } from '../../redux/actions/customers';


const Saving = () => {

  const dispatch = useDispatch()
  const saving = useSelector((state) => state.savings)
  const { loading, success, error, message } = saving
  const [state, setState] = useState('')
  const [ customerName, setCustomerName ] = useState('')

  const userInfo = localStorage.getItem("userInfo")
  const user = JSON.parse(userInfo)
  
  const initialValues = {
    pageNo: '', 
    accountNumber: '', 
    amount: '',
    postedBy: user.userExist.surName + ' ' + user.userExist.otherNames,
  }

  const notify = () => toast.success(
    `${message}`, { duration: 7000}
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
  
  const onSubmit = (values, props) => {
    dispatch(createSavings(values))
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
                fullWidth name="pageNo" 
                label='Page No'
                placeholder="Page No" 
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

export default Saving;
