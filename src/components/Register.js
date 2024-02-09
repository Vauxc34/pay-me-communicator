import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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

import { CREATE_USER } from '../graphql/Mutation';
import { useMutation } from '@apollo/client';
import { UserContext } from '../UserProvider';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Register = () => {
  
  const [createUser, { error }] = useMutation(CREATE_USER)
  //const [createUL, {  }] = useMutation(CREATE_USER)

  const userContext = useContext(UserContext);
  const { setUser } = userContext  
  
  function InputAdornments() {

    const [UserName, setUserName] = useState('')
    const [UserLastName, setUserLastName] = useState('')
    const [UserMail, setUserMail] = useState('')
    const [UserPassword, setUserPassword] = useState('')
    const [UserGender, setUserGender] = useState('')
    const [showPassword, setShowPassword] = useState(false)
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let navigate = useNavigate()
  
    const handleMouseDownPassword = (event) => { event.preventDefault() };

    const RegisterNewUser = () => {
      createUser({
        variables:
        { 
            first_name: UserName,
            last_name: UserLastName,
            profile_pic: '',
            password: UserPassword,
            email: UserMail,
            gender: UserGender,
            phone_number: 999999999,
            friend_list: [],
            birth_date: "20-02-2002"
        }
      })

    }
  
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
         
         <h2>Registration</h2>
         
        <div>
          <TextField
            label="Name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
          />
          <TextField
            label="Surname"
            value={UserLastName}
            onChange={(e) => setUserLastName(e.target.value)}
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
          />

        </div>

        <div style={{ margin: '0 10px 0 -5px' }}>

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Email Address</InputLabel>
            <FilledInput
            value={UserMail}
            onChange={(e) => setUserMail(e.target.value)}
              id="filled-adornment-password"
              type={'email'}
            />
          </FormControl>
        </div>

        <div style={{ margin: '0 10px 0 -5px' }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
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

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Repeat password</InputLabel>
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

        <FormControl fullWidth>
   
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={'Male'}
     onChange={(e) => setUserGender(e.target.value)}
  >
    <MenuItem value={'Male'}>Male</MenuItem>
    <MenuItem value={'Female'}>Female</MenuItem>
  </Select>
</FormControl>

        </div>

        <div>
        <Button onClick={RegisterNewUser} style={{ margin: '10px 6px' }} variant="contained">Register
        <ExitToAppIcon style={{ margin: '0 0px 0 6px' }}/>
        </Button>
        <Button onClick={() => navigate('/login')} style={{ margin: '10px 6px' }} variant="outlined">Go to login
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

export default Register