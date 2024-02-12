import React, { useState, useEffect, useContext } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { useMutation } from '@apollo/client';
import { storage, app } from '../config';

/* */

import { useNavigate, useLocation} from 'react-router-dom';
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

const ProfileSomeone = () => {

    let location = useLocation()
    let navigate = useNavigate()
    const ProfileId = location.pathname.split('/', 3)[2] 

    const [NewUserList, setNewUserList] = useState([])  
    const [UserProfile, setUserProfile] = useState({})

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}users/list`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setNewUserList(data.content))
    }, [])

    let lookingUser = NewUserList.find(item => item.id == ProfileId)

    useEffect(() => {
      if(lookingUser != undefined) {
        setUserProfile(lookingUser)
      } else {

      }
    }, [lookingUser])

    return (
    <>
    
      <div className='form-bigger-page'>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        background: 'white',
        padding: '15px',
        borderRadius: '15px',
        margin: '15px',
        }}>
         
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <h2 style={{ margin: '0 6px' }}>{UserProfile.first_name == undefined ? 'User' : 
        UserProfile.first_name + ' ' + UserProfile.last_name}</h2>
        </div>

        <div className='SplittedBlock'>
          <div className='block-partial-half'>
          <div className='UserPicView' style={{ backgroundImage: `url(${UserProfile.profile_pic ? UserProfile.profile_pic : 'https://placehold.co/200x250'})` }}></div>
          </div>
          <div className='block-partial-half'>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Email address: {UserProfile.email == undefined ? 'example@net.pl' : UserProfile.email}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Phone number: {UserProfile.phone_number == undefined ? '999 888 777' : UserProfile.phone_number}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Gender: {UserProfile.gender == undefined ? 'not selected' : UserProfile.gender}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Birth date: {UserProfile.birth_date == undefined ? '19-02-2001' : UserProfile.birth_date}</span>
          </div>
          {/*<div style={{ margin: '10px 0px 0px 0px' }}>
            <Button variant='outlined'>Change picture</Button>
          </div>*/}
          </div>
        </div>

        <div>
        
        <Button onClick={() => navigate('/')} style={{ margin: '10px 6px' }} variant="outlined">Back</Button>
        </div>
        
      </Box>

      <div className='sideMain_part'></div>

      </div>

    </>
  )
}

export default ProfileSomeone