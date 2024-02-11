import React, { useState, useEffect, useContext } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { useMutation } from '@apollo/client';
import { storage, app } from '../config';

/* */

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
import { UPDATE_PROFILE_PIC } from '../graphql/Mutation'; 

/* providers */

const Profile = () => {

    let navigate = useNavigate()
    const userContext = useContext(UserContext);
    const { User } = userContext 

    const [UpdateProfilePic, { error }] = useMutation(UPDATE_PROFILE_PIC)
    const [UserProfilePic, setUserProfilePic] = useState(User ? User.profile_pic : 'https://placehold.co/200x250')
    const [file, setFile] = useState("")

    function handleChange(event) { setFile(event.target.files[0]) } 

    const SendAPhoto = () => {
      if (file !== '') {
        const uniqueImgName = Math.floor(Math.random() * 500) + 'ProfilePic';
        const storage = getStorage(app);
        const storageRef = ref(storage, `/users_pics/${User.id}/${uniqueImgName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.error('Error uploading file:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUserProfilePic(downloadURL)
               UpdateProfilePic({ variables: { id: User.id, profile_pic: downloadURL } })
            });
          }
        );
      } else {
        console.log('No photo selected');
      }
    };

    useEffect(() => { SendAPhoto() }, [file]);

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
        <h2 style={{ margin: '0 6px' }}>{User.first_name} {User.last_name}</h2>
        </div>

        <div className='SplittedBlock'>
          <div className='block-partial-half'>
          <div className='UserPicView' style={{ backgroundImage: `url(${UserProfilePic})` }}>

          <div className='HoverScreen'>

            <h3>Click, to change</h3>

          <input type="file" accept='*' onChange={handleChange}></input>

          </div>

          </div>
          </div>
          <div className='block-partial-half'>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Email address: {User.email}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Phone number: {User.phone_number}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Gender: {User.gender}</span>
          </div>
          <div style={{ margin: '2.5px 0px 0 0px' }}>
            <span>Birth date: {User.birth_date}</span>
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

export default Profile