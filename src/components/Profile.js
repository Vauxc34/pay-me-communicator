import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';

/* providers */

import { UserContext } from '../UserProvider';

/* providers */

const Profile = () => {

  const userContext = useContext(UserContext);
  const { User } = userContext 
  
  function InputAdornments() {

    const [showPassword, setShowPassword] = useState(false);
  
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
         
         <h1>Profile</h1>
         
        <div style={{ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap' }}>

        <Avatar />

          <span style={{ margin: '0 6px' }}>
            {User.first_name} {User.last_name}
          </span>

        </div>

        <div style={{ margin: '0 10px 0 -5px' }}>
          
        </div>

        <div style={{ margin: '0 10px 0 -5px' }}>
          
        </div>

        <div>

        </div>

        <div>
        
        <Button onClick={() => navigate('/')} style={{ margin: '10px 6px' }} variant="outlined">Back</Button>
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

export default Profile