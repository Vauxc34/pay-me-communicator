import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'; 

/* */

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

/* providers */

import { UserContext } from '../UserProvider';
import { GET_ALL_CONVERSATIONS } from '../graphql/Queries';

/* providers */

const Chats = ({ 
  SettingChatMobile, 
  setIdConference
 }) => {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const userContext = useContext(UserContext);
  const { User } = userContext

  const UsersList = [
    {name: 'Josef'},
    {name: 'Felicyta'},
    {name: 'Brygida'},
    {name: 'Magda'},
    {name: 'Andrzej'},
    {name: 'Dawid'},
  ]

  const [idUser, setIdUser] = useState(User ? User.id : 0)
  const [AllChats, setAllChats] = useState([]) 
  const [isYourMessage, setIsYourMessage] = useState(User ? `${User.first_name + ' ' + User.last_name}` : 'no user')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}conversations/messages/${idUser}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setAllChats(data.content))
  }, [])

  const MessageThreadComponent = ({ item, idThread }) => {
    let ItemIndex = AllChats.findIndex(item => item.id == idThread)
    const [Users, setUsers] = useState(JSON.parse(AllChats[ItemIndex].users))
    const [Messages, setMessages] = useState(JSON.parse(AllChats[ItemIndex].messages))

    useEffect(() => {
     let NewUsersNameObj = Users.filter((item) => item.user != isYourMessage)
     setUsers(NewUsersNameObj[ItemIndex])
    }, [])

    const MultipleFunction = () => {
      setIdConference(idThread)
    }
    
    return (
      <div onClick={MultipleFunction} className='ChatCloud'>
          <div className='profileUserSmaller'></div>
            <div className='container--'>
              <h3>{Users.name} {Users.surname}</h3>
            <span className='mess_ You'>{Messages.slice(-1)[0].content}</span>
          </div>
        </div>
    )}
  
    return (
    <>
        <div className='conversation-part'>

          <div className='UsersBar'>


          {UsersList.map(item => <div className='dot_user__bar'>
<StyledBadge
overlap="circular"
anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
variant="dot"
>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
</StyledBadge>
<span></span>
</div>

          )}

         
       
          </div>

            <br></br>
            <h3>Chats</h3>
            <hr></hr>
            {AllChats.map(item => <MessageThreadComponent item={item} idThread={item.id} />)}
        </div>
    </>
  )
}

export default Chats