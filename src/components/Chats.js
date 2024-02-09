import React, { useState, useEffect, useContext } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMutation } from '@apollo/client'; 


/* */

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

/* providers */

import { UserContext } from '../UserProvider';
import { CREATE_MESSAGE } from '../graphql/Mutation'; 

/* providers */

const Chats = ({ 
  Preloading,
  SettingChatMobile, 
  setIdConference
 }) => {

  const [createMessage, { error }] = useMutation(CREATE_MESSAGE)
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

  const userContext = useContext(UserContext);
  const { User } = userContext

  let parsedUserList = JSON.parse(User.friend_list)
  const [NewUserList, setNewUserList] = useState([])


  useEffect(() => {
    if(User) {
      setNewUserList(parsedUserList)
    } else {  }
  }, [User])

  const [idUser, setIdUser] = useState(User ? User.id : 0)
  const [AllChats, setAllChats] = useState([]) 
  const [isYourMessage, setIsYourMessage] = useState(User ? `${User.first_name + ' ' + User.last_name}` : 'no user')

  const UserDotComponent = (item) => {

    const CollabolatorNames = item.item

    const SelectUserAndCreateMess = () => {
      createMessage({
        variables: {
          idUser: 23, 
          users: [{}],
          messages: [{}]
        }
      })
    }

    const SelectAndCreate = () => {

      const UserScheme = [
        {name:User.first_name,surname:User.last_name},
        {name:CollabolatorNames.first_name,surname:CollabolatorNames.last_name}
      ]

      fetch(`${process.env.REACT_APP_API_URL}conversations/single-message/new`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * 9999),
            idUser: idUser,
            users: UserScheme,
            messages: [
                {user: isYourMessage, content: "👋"} 
            ]
    })}).then(res => res.json()).then(window.location.reload(false))}

    return (
      <div className='dot_user__bar' onClick={SelectAndCreate}>
      <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
      <span>{item.first_name}</span>
      </div>
    )
  }

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


      if(window.innerWidth < 819) {
        setIdConference(idThread)
        SettingChatMobile()
      } else {
        Preloading()
        setIdConference(idThread)
      }
      
      
    }
    
    return (
      <div onClick={MultipleFunction} className='ChatCloud'>
          <div className='profileUserSmaller'></div>
            <div className='container--'>
              <h3>{Users ? Users.name + ' ' + Users.surname : 'Collabolator'}</h3>
            <span className='mess_ You'>{Messages[0] ? Messages.slice(-1)[0].content : ''}</span>
          </div>
        </div>
  )} 

    return (
    <>
  <div className='conversation-part'>
  <div className='UsersBar'>{NewUserList == [] ? null : NewUserList.map(item => <UserDotComponent item={item}/>)}</div>
  <br></br>
  <h3>Chats</h3>
  <hr></hr>
  {AllChats.map(item => <MessageThreadComponent item={item} idThread={item.id} />)}
  </div>
    </>
  )
}

export default Chats