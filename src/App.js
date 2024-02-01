import React, { useState, useEffect, useContext, useRef } from 'react'
import { Route, BrowserRouter as Router, Routes,  useNavigate  } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './graphql/Mutation';
import { GET_ALL_USERS } from './graphql/Queries';
import './styles/main.scss'

/* providers */

import { UserContext, UserProvider } from './UserProvider';

/* providers */

/* components */

import Chats from './components/Chats';
import Sidebar from './components/Sidebar';
import DiscusionBoard from './components/DiscusionBoard';
import Register from './components/Register'
import Login from './components/Login'

/* components */

{/* <button onClick={() => { createUser({
        variables:
        { 
            first_name: 'Marian',
            last_name: 'Dabrowski',
            email: 'arnold@wp.pl',
            gender:	'male',
            ip_address: '192.23.12.31',
        }
      }) }}>Test</button>
      <button onClick={() => { deleteUser({
        variables:
        { 
            first_name: 'Andzelika',
        }
      }) }}>Delete</button>
      <button onClick={() => { updateUser({
        variables:
        { 
            id: 7,
            first_name: 'Andzelika',
        }
      }) }}>UPDATE</button>
      <ul>
      {userArray == [] ? null : userArray.map(item => <li>  
        {item.first_name}
      </li> 
      )}
      </ul>
      */}

function App() {

  const [createUser, { error }] = useMutation(CREATE_USER)

  const [deleteUser, {  }] = useMutation(DELETE_USER)
  const [updateUser, { }] = useMutation(UPDATE_USER)

  const [userArray, setUserArray] = useState([])

  const { data } = useQuery(GET_ALL_USERS)

  useEffect(() => {
    if(data) {
      setUserArray(data.getAllUsers)
    }
  }, [data])

  const [ConversationActiveMobile, setConversationActiveMobile] = useState(false)

  const ConversationList = useRef()
  const AdditionalList = useRef()

  const SettingChatMobile = () => {
    setConversationActiveMobile(true) 
    if(ConversationActiveMobile) {
      setConversationActiveMobile(false) 
    }
  }

  let ActualWidth = window.innerWidth

  useEffect(() => {
    if(ConversationActiveMobile) {
      ConversationList.current.style.zIndex = 2
      AdditionalList.current.style.zIndex = -2
    } else if (ActualWidth < 819) {
      ConversationList.current.style.zIndex = -1
      AdditionalList.current.style.zIndex = 4
    } else {
      ConversationList.current.style.zIndex = 2
      AdditionalList.current.style.zIndex = 4
    }
  }, [ConversationActiveMobile, ActualWidth])
  
  return (
    
    <UserProvider>
    <div className='wrapper'>
    <Sidebar AdditionalList={AdditionalList}/>
       
      <Routes>
        <Route path='/' element={<>
          <Chats SettingChatMobile={SettingChatMobile}/>
          <DiscusionBoard 
          ConversationList={ConversationList} 
          AdditionalList={AdditionalList}
          SettingChatMobile={SettingChatMobile}
          /> 
        </>}></Route>
        <Route path='/profile' element={<Register/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
       
      </div>
    </UserProvider>   
  );
}

export default App;
