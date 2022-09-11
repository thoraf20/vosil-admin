import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, TextField, Button, Box } from '@mui/material';
import { toast, Toaster} from 'react-hot-toast'
import { Formik, Field, Form } from 'formik'
import AccountTypeSelect from '../../commons/AccountType';
import MaritalStatusSelect from '../../commons/MaritalStatus.js';
import GenderSelect from '../../commons/Gender.js';

import { 
  accounts, maritalStatus, genders,  
  alerts
} from '../../utils/index'

import { createCustomer } from '../../redux/actions/customers'

const CustomerDetails = () => {

  const dispatch = useDispatch()
  const customer = useSelector((state) => state.addCustomer)
  const { loading, success, error, allData } = customer  

  const [alert, setAlert] = useState(alerts[0].value);

  const handleAlertsChange = (event) => {
    setAlert(event.target.value);
  };

  const [data, setData ] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setData({...data, [name]: value});
  };


  const user = localStorage.getItem("userInfo")
  const accOfficer = JSON.parse(user)

  const initialValues = {
    surName: '', otherNames: '', accountOfficer: '',
    email: '', phoneNumber: '', occupation: '',
    residentialAddress: '', officeAddress: '',
    nextOfKin: '', nextOfKinRelationShip: '', stateOfOrigin: '',
    nextOfKinAddress: '', nextOfKinPhoneNumber: '',
    accountType: '', gender: '', maritalStatus: ''
  }

  const notify = () => toast.success(
    `Customer Successfully Added.`, { duration: 4000}
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notifyError = () => toast.error(
    `${error}.`, { duration: 4000, position: 'top-right'}
  )

  useEffect(() => {
    if (error) {
      notifyError()
    }
    if (success) {
      notify()
    }
  }, [error, success])

  const onSubmit = (values, props) => {
    dispatch(createCustomer(values))
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
      <div className='flex justify-between'>
        <Field as={TextField} 
          required
          id="outlined-required"
          label="SurName"
          name='surName'
          size='medium'
          style={{width: "30%"}}
        />
        <Field as={TextField} 
          required
          id="outlined-required"
          label="OtherNames"
          name='otherNames'
          size='medium'
          style={{width: "30%"}}
        />

        <Field as={TextField} 
          id="outlined-required"
          label="Email"
          name='email'
          size='medium'
          style={{width: "30%"}}
        />
      </div>
      <div>
        <Field as={TextField} 
          id="outlined-number"
          label="Phone Number"
          name='phoneNumber'
          InputLabelProps={{
            shrink: true,
          }}
          size='medium'
          style={{width: "30%"}}
        />

        <AccountTypeSelect
          label='Account Type'
          name="accountType"
          helperText="Please select a account type"
        >
          {accounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </AccountTypeSelect>

        <Field as={TextField} 
          id="outlined"
          label="Account Officer"
          name='accountOfficer'
          size='medium'
          style={{width: "30%"}}
        />
        </div>
        <div>

          <MaritalStatusSelect
            label='Marital Status'
            name="maritalStatus"
            helperText="Please select marital status"
          >
            {maritalStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MaritalStatusSelect>

          <GenderSelect 
            id="outlined-select-account-officer"
            label="Gender"
            name="gender"
            size='medium'
            style={{width: "30%"}}
            helperText="Please select gender"
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </GenderSelect>
        
          <Field as={TextField} 
            id="outlined"
            label="State Of Origin"
            name='stateOfOrigin'
            size='medium'
            style={{width: "30%"}}
          />
        </div>

        <div>
          <Field as={TextField} 
            required
            id="outlined-required"
            label="Residential Address"
            name='residentialAddress'
            size='medium'
            style={{width: "30%"}}
          />
          <Field as={TextField} 
            required
            id="outlined-required"
            label="Office Address"
            name='officeAddress'
            size='medium'
            style={{width: "30%"}}
          />

          <Field as={TextField} 
            id="outlined-disabled"
            label="Occupation"
            name='occupation'
            size='medium'
            style={{width: "30%"}}
          />
        </div>
       
        <Field as={TextField} 
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
          </Field>
          <Field as={TextField} 
            id="outlined-disabled"
            label="Next Of Kin"
            name='nextOfKin'
            size='medium'
            style={{width: "30%"}}
          />
          <Field as={TextField} 
            id="outlined-disabled"
            label="Next Of Kin Relationship"
            name='nextOfKinRelationship'
            size='medium'
            style={{width: "30%"}}
        />
        
        <Field as={TextField} 
          id="outlined-disabled"
          label="Next Of Kin Address"
          name='nextOfKinAddress'
          size='medium'
          style={{width: "30%"}}
        />
        <Field as={TextField} 
          id="outlined-disabled"
          label="Next Of Kin Phone No"
          name='nextOfKinPhoneNumber'
          size='medium'
          style={{width: "30%"}}
        />
        
      <div className='flex justify-end'>
        <Button type='submit' 
          disabled={props.isSubmitting}
          style={{ background: 'black', borderRadius: '10px', color: 'white' }}
        >
          {props.isSubmitting ? "Saving" : "Save"}
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

export default CustomerDetails