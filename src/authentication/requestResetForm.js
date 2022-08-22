import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {  useNavigate } from 'react-router-dom';
import { Stack, TextField, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';



export default function RequestReset() {
  const navigate = useNavigate();  

  const ResetRequestSchema = Yup.object().shape({    
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  })

  const formik = useFormik({ initialValues: { email: '' },    
    validationSchema: ResetRequestSchema,    
    onSubmit: () => { 
      navigate('/reset_password', { replace: true });
    } 
  });

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const submitHandler = (e) => { 
    e.preventDefault();     
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: "#000000", 
      padding: "20px", 
      borderRadius: "10px",
      height: '100vh'
      }}
      >
        <Paper sx={{padding: 10}}>
          <Typography sx={{fontSize: '2rem'}}>Vosil</Typography>

          <div>
            <Typography>
              To reset your password enter the email you registered 
              with below and a password reset link will be sent to you.
            </Typography>
          </div>
          <FormikProvider value={formik}> 
            <Form autoComplete="off" noValidate onSubmit={submitHandler}> 
              <Stack spacing={3}>
                <TextField
                  autoComplete="email" 
                  type="email" 
                  label="Email address" {...getFieldProps("email")}                            
                  error={Boolean(touched.email && errors.email)}              
                  helperText={touched.email && errors.email} 
                />
              </Stack>
              <LoadingButton fullWidth size="large" type="submit"            
                variant="contained"            
                loading={isSubmitting}            
                sx={{ backgroundColor: "#fbc947", color: "#000000", marginTop: "20px" }}
                >            
                  Submit         
              </LoadingButton>       
            </Form>
          </FormikProvider>
        </Paper>
    </div>
  )
}