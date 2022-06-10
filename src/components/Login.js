import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {Stack, Link, Container, Typography } from '@mui/material';
// layouts// components
import Page from '../components/page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../authentication';
// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({  
  [theme.breakpoints.up('md')]: {    display: 'flex'  }}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,  margin: 'auto',  display: 'flex',  
  minHeight: '100vh',  flexDirection: 'column',  
  justifyContent: 'center',  padding: theme.spacing(12, 0)}
  ));
// ----------------------------------------------------------------------
export default function Login() {  
  return (    
    <RootStyle title="Login | Sherz" 
     sx={{ backgroundColor: "#f4f4f4", backround: 'url(backgrndLogo.svg)' }}>      
      <Container maxWidth="sm">        
        <ContentStyle>          
          <Stack sx={{ mb: 5 }}>            
            <div style={{ display: "flex", justifyContent: "center" }}>              
              <Typography variant="h4" gutterBottom>               
                Welcome              
              </Typography>            
            </div>                  
          </Stack>          

          <LoginForm />
          <MHidden width="smUp">            
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>              
              Don’t have an account?&nbsp;              
            <Link variant="subtitle2" component={RouterLink} to="register">                
             Get started              
            </Link>            
            </Typography>          
         </MHidden>        
        </ContentStyle>      
      </Container>    
    </RootStyle>  
);
}