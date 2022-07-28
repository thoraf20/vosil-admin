import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {  
  Link,  Stack, Grid,
  Checkbox,  TextField,  
  IconButton,  InputAdornment,  
  FormControlLabel, Paper, Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EmailIcon from "@mui/icons-material/Email";
import { login } from "../redux/actions/login";

export default function LoginForm({ history }) {  
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({    
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),    
  password: Yup.string().required('Password is required')  });

  const userLogin = useSelector((state) => state.loginStore);  
  const { userInfo } = userLogin;

  const formik = useFormik({ initialValues: { email: '', password: '', remember: true },    
    validationSchema: LoginSchema,    
    onSubmit: () => { 
      navigate('/login', { replace: true });
    } 
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
   useEffect(() => {     
  if (userInfo && userInfo?.token) {      
    navigate("/overview")} 
    else { navigate("/login") }
   }, [history, navigate, userInfo]);

   const submitHandler = (e) => { 
      e.preventDefault();     
  //DISPATCH LOGIN     
  dispatch(login(values.email, values.password));
  // await login(values.email, values.password) 
};
  const handleShowPassword = () => { 
    setShowPassword((show) => !show); 
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
      <FormikProvider value={formik}>        
        <Form autoComplete="off" noValidate onSubmit={submitHandler}>          
          <Stack spacing={3}>
            <TextField
              autoComplete="username" 
              type="email" 
              label="Email address" {...getFieldProps("email")}              
              InputProps={{ endAdornment: (                  
              <InputAdornment position="end">                    
              {/* <Icon icon={eyeFill} />                  */}
              </InputAdornment> 
              ),}}              
              error={Boolean(touched.email && errors.email)}              
              helperText={touched.email && errors.email} 
            />
            <TextField             
              autoComplete="current-password"              
              type={showPassword ? "text" : "password"}              
              label="Password" {...getFieldProps("password")}              
              InputProps={{ endAdornment: (
              <InputAdornment position="end">                   
              <IconButton onClick={handleShowPassword} edge="end">
              <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>                  
              </InputAdornment>
              ),              
              }}   
              error={Boolean(touched.password && errors.password)}              
              helperText={touched.password && errors.password}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} >            
            <FormControlLabel control={<Checkbox {...getFieldProps("remember")}                  
            checked={values.remember} /> }              
            label="Remember me"/>
            <Link 
              component={RouterLink}              
              variant="subtitle2"              
              to="#"              
              sx={{ color: "#000000", textDecoration: "none" }}>              
              Forgot password?            
            </Link>          
          </Stack>
             <LoadingButton fullWidth size="large" type="submit"            
            variant="contained"            
            loading={isSubmitting}            
            sx={{ backgroundColor: "#fbc947", color: "#000000" }} >            
              Login          
            </LoadingButton>        
          </Form>      
      </FormikProvider>    
      </Paper>
    </div>  
  );
}