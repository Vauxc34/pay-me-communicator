import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Sidebar = ({ AdditionalList }) => {
    
    const [userStatus, setUserStatus] = useState('#ff0000')

return (
    <div className='sideMain_part' ref={AdditionalList} style={{ zIndex: 2 }}>

<div className='profileUserSmaller' style={{ 
  backgroundImage: `url(${'https://yt3.googleusercontent.com/ytc/AIf8zZQ04J5rjrgCf5mp9adzQ6q0PhKqaFUPNa_AUJVY=s900-c-k-c0x00ffffff-no-rj'})`,
  margin: '10px'
  }}>
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
          <LogoutIcon/>
          Log out
        </li>
    </ul>

    </div>
  )
}

export default Sidebar