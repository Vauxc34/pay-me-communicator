import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Login = () => {
  
  function InputAdornments() {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let navigate = useNavigate()
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
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
            />
          </FormControl>
        </div>
        <div style={{ margin: '0 10px 0 -5px' }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
        <Button style={{ margin: '10px 6px' }} variant="contained">Login
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