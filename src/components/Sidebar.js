import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { UserContext } from '../UserProvider';

const Sidebar = ({ AdditionalList }) => {

  const userContext = useContext(UserContext);
  const { User, setUser } = userContext  
    
    const [userStatus, setUserStatus] = useState('#10a600')

    const UserStatusSetter = () => {
      if(User) {
        setUserStatus('#10a600')
      } else {
        setUserStatus('#ff0000')
      }
    }

    useEffect(() => { UserStatusSetter() }, [User])


return (
    <div className='sideMain_part' ref={AdditionalList} style={{ zIndex: 2 }}>

      <div className='profileUserSmaller' style={{ backgroundImage: `url(${User ? User.profile_pic : 'https://placehold.co/75x75'})`, margin: '10px' }}>
  <div className='dot_' style={{ background: userStatus }}></div>
      </div>

    <ul className='navList'>
    
        <Link to="/">
        <li>
        <HomeIcon/>
          Home   
        </li>
        </Link>
        {/** */}
        <Link to="/profile">
        <li>
        <AccountBoxIcon/>
          Profile   
        </li>
        </Link>
         {/** */}
        <li>
          {User == null ? <a onClick={() => window.location.replace(`${process.env.REACT_APP_SITE_URL}login`)} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' }}>  
          <LoginIcon/>
          Log in
          </a> : <a onClick={() => setUser(null)} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' }}>
          <LogoutIcon/>
          Log out
          </a>}
        </li>
    </ul>

    </div>
  )
}

export default Sidebar