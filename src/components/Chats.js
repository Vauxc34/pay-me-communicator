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
  idConference,
  setIdConference, 
  setSettedColab,
  NewSentMessages,
  setNewSentMessages,
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
 
  const [NewUserList, setNewUserList] = useState([])  

  useEffect(() => {
    if(User) {
      fetch(`${process.env.REACT_APP_API_URL}users/list`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setNewUserList(data.content))
      
    } else {  }
  }, [User])

  const idUser = User ? User.id : 0
  const [AllChats, setAllChats] = useState([]) 
  const isYourMessage = User ? `${User.first_name + ' ' + User.last_name}` : 'no user'

  const UserDotComponent = (item) => {
    const Collabolator = item.item   
 
    /*const SelectUserAndCreateMess = () => {
      createMessage({
        variables: {
          idUser: 23, 
          users: [{}],
          messages: [{}]
        }
      })
    }*/

    const SelectAndCreate = () => {
    setSettedColab(Collabolator)
    const ChatVisitors = [{id: idUser }, {id: Collabolator.id }]

    const UserScheme = [
        {id: idUser, name:User.first_name,surname:User.last_name},
        {id: Collabolator.id, name:Collabolator.first_name,surname:Collabolator.last_name}
    ]

    fetch(`${process.env.REACT_APP_API_URL}conversations/single-message/new`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * 9999),
            idUsers: ChatVisitors,
            users: UserScheme,
            messages: [
                {user: isYourMessage, content: "👋", attachment: '[]'} 
            ]
    })}).then(res => res.json()).then(window.location.reload(false))}

    return (
      <div className='dot_user__bar' onClick={SelectAndCreate}>
      <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      >
      <Avatar alt={Collabolator.first_name} src={Collabolator.profile_pic}/>
      </StyledBadge>
      <span>{Collabolator.first_name}</span>
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
      if(NewSentMessages != []) {
        fetch(`${process.env.REACT_APP_API_URL}conversations/messages/${idUser}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }}).then(res => res.json()).then(data => setAllChats(data.content))
      }       
  }, [NewSentMessages])

  const MessageThreadComponent = ({ item, idThread }) => {

    const CollabolatorsArray = JSON.parse(item.users)

    const LookingCollabolator = CollabolatorsArray.filter(item => item.id != idUser)
    const RightOneCollabolator = CollabolatorsArray.find(item => item.id)

    let ItemIndex = AllChats.findIndex(item => item.id == idThread) 
    const Messages = JSON.parse(AllChats[ItemIndex].messages)

    const MultipleFunction = () => { 
    setIdConference(idThread) 
    setSettedColab(LookingCollabolator)
    setNewSentMessages([])
    } 

    let SettedPic = NewUserList.find(item => item.id == RightOneCollabolator.id)     
    let SettedPicC = LookingCollabolator[0] ? NewUserList.find(item => item.id == LookingCollabolator[0].id) : ''  

    return (
      <div onClick={MultipleFunction} className='ChatCloud'>
          {LookingCollabolator[0] == undefined ? <div className='profileUserSmaller' style={{ backgroundImage: `url(${SettedPic == undefined ? '' : SettedPic.profile_pic})` }}></div> : null}
          {LookingCollabolator[0] ? <div className='profileUserSmaller' style={{ backgroundImage: `url(${SettedPicC == undefined ? '' : SettedPicC.profile_pic})` }}></div> : null}
            <div className='container--'>
              {LookingCollabolator[0] ? <h3>{LookingCollabolator[0] ? LookingCollabolator[0].name + " " + LookingCollabolator[0].surname : ''}</h3> : null}
              {RightOneCollabolator ? <h3>{LookingCollabolator[0] ? '' : RightOneCollabolator ? RightOneCollabolator.name + " " + RightOneCollabolator.surname : ''}</h3> : null}
            {idThread == idConference ? <span className='mess_ You'>{NewSentMessages[0] ? NewSentMessages.slice(-1)[0].content : Messages.slice(-1)[0].content}</span> : <span className='mess_ You'>{Messages[0] ? Messages.slice(-1)[0].content : Messages.slice(-1)[0].content}</span>}
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