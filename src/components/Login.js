import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; 
import FilledInput from '@mui/material/FilledInput'; 
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment'; 
import FormControl from '@mui/material/FormControl'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/* */

import { toast } from 'react-toastify'; 
import { UserContext } from '../UserProvider';

const Login = () => {

  let navigate = useNavigate()
  const userContext = useContext(UserContext);
  const { User, setUser } = userContext  

  function InputAdornments() {

    const [UserEmail, setUserEmail] = useState('')
    const [UserPassword, setUserPassword] = useState('')

    const LogInUser = () => {  
    fetch(`${process.env.REACT_APP_API_URL}users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: UserEmail,
            password: UserPassword
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => setUser(data.content[0]))
    .catch(error => toast.error('Fetch error:', error));
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let navigate = useNavigate()
  
    const handleMouseDownPassword = (event) => {  event.preventDefault() };
  
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        background: 'white',
        padding: '15px',
        borderRadius: '15px',
        margin: '15px',
        }}>
         <h2>Login</h2>
        <div style={{ margin: '0 10px 0 -5px' }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Email Address</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={'email'}
              onChange={(e) => setUserEmail(e.target.value)}
              value={UserEmail}
            />
          </FormControl>
        </div>
        <div style={{ margin: '0 10px 0 -5px' }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setUserPassword(e.target.value)}
              value={UserPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />           

          </FormControl>
        </div>
        <div>

        </div>

        <div>
        <Button onClick={LogInUser} style={{ margin: '10px 6px' }} variant="contained">Login
        <ExitToAppIcon style={{ margin: '0 0px 0 6px' }}/>
        </Button>
        <Button onClick={() => navigate('/register')} style={{ margin: '10px 6px' }} variant="outlined">Go to Register
        <ExitToAppIcon style={{ margin: '0 0px 0 6px' }}/>
        </Button>
        </div>
        
      </Box>
    );
  }
  
    return (
    <>
    
      <div className='form-bigger-page'>
        <InputAdornments/>
      <div className='sideMain_part'></div>

      </div>

    </>
  )
}

export default Login