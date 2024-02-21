import React, { useState, useEffect, useContext, useRef } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation, Link  } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useMutation, useQuery } from '@apollo/client';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './graphql/Mutation';
import { ToastContainer } from 'react-toastify'; 
import { GET_ALL_USERS } from './graphql/Queries';

import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss'

/* providers */

import { UserContext } from './UserProvider';

/* providers */

/* components */

import Chats from './components/Chats';
import Sidebar from './components/Sidebar';
import DiscusionBoard from './components/DiscusionBoard';
import Register from './components/Register'
import Profile from './components/Profile'
import ProfileSomeone from './components/ProfileSomeone';
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

  const link2 = new HttpLink({
    uri: 'http://localhost:3004/conversations/message',
  });

  const client2 = new ApolloClient({
    link: link2,
    cache: new InMemoryCache(),
  });

  const userContext = useContext(UserContext);
  const { User } = userContext  

  //const [deleteUser, { }] = useMutation(DELETE_USER)
  //const [updateUser, { }] = useMutation(UPDATE_USER)

  //const [userArray, setUserArray] = useState([])

  //const { data } = useQuery(GET_ALL_USERS, { client: link2 })

  /*useEffect(() => {
    if(data) {  setUserArray(data.getAllUsers) }
  }, [data])*/

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
  
  let location = useLocation()
  let ExactPath = location.pathname

  const LoggedUserArea = () => {

    const [NewSentMessages, setNewSentMessages] = useState([])
    

    

    const [ArrayOfEveryUsers, setArrayOfEveryUsers] = useState([])

    const [SettedCollab, setSettedColab] = useState(JSON.parse(localStorage.getItem("SettedCollab")) ?? 'Collabolator')
    useEffect(() => { localStorage.setItem("SettedCollab", JSON.stringify(SettedCollab)) }, [SettedCollab])

    const [idConference, setIdConference] = useState(JSON.parse(localStorage.getItem("idConference")) ?? 0) 
    useEffect(() => { localStorage.setItem("idConference", JSON.stringify(idConference)) }, [idConference])

    useEffect(() => {
      if (ConversationActiveMobile && ExactPath == '/') {
      ConversationList.current.style.zIndex = 2
      AdditionalList.current.style.zIndex = -2
    } else if (ActualWidth < 819 && ExactPath == '/') {
      ConversationList.current.style.zIndex = -1
      AdditionalList.current.style.zIndex = 4
    } else {
      ConversationList.current.style.zIndex = 2
      AdditionalList.current.style.zIndex = 4
    }
    }, [ConversationActiveMobile, ActualWidth])
    const Preloading = () => {window.location.reload(false)}

    return (
       <>
       <ApolloProvider client={client2}>
       <Chats 
       setSettedColab={setSettedColab}
       Preloading={Preloading}
       ConversationActiveMobile={ConversationActiveMobile}
       setConversationActiveMobile={setConversationActiveMobile}
       SettingChatMobile={SettingChatMobile} 
       idConference={idConference}
       setIdConference={setIdConference}
       NewSentMessages={NewSentMessages}
       setNewSentMessages={setNewSentMessages}
       />
       <DiscusionBoard 
       ArrayOfEveryUsers={ArrayOfEveryUsers}
       setArrayOfEveryUsers={setArrayOfEveryUsers}
       NewSentMessages={NewSentMessages}
       setNewSentMessages={setNewSentMessages}
       SettedCollab={SettedCollab}
       idConference={idConference}
       ConversationList={ConversationList} 
       AdditionalList={AdditionalList}
       SettingChatMobile={SettingChatMobile}
       /> 
       </ApolloProvider>
      </>
    )
  }

  return (
    
    <div className='wrapper'>
    <Sidebar AdditionalList={AdditionalList}/>
      <Routes>
        <Route path='/' element={User == null ? <div className='form-bigger-page' style={{ 
          flexDirection: 'column' }}>
        <h3>You are not logged in</h3>
        <Link to="/login">
        <span style={{ color: '#fff' }}>
        Log into your account
        </span>
        </Link>
      </div> : <LoggedUserArea/>}></Route>
        <Route path='/profile' element={User ? <Profile /> : 
        <div className='form-bigger-page' style={{ 
          flexDirection: 'column' }}>
        <h3>You are not logged in</h3>
        <Link to="/login">
        <span style={{ color: '#fff' }}>
        Log into your account
        </span>
        </Link>
      </div>}></Route>
      <Route path="/profile/:id" element={<ProfileSomeone/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={User ?  
        <div className='form-bigger-page' style={{ 
          flexDirection: 'column' }}>
        <Link to="/login">
        <span style={{ color: '#fff' }}>
        404
        </span>
        </Link>
      </div> : <Login/>}></Route>
      </Routes>
      <ToastContainer
      position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
      />
      </div>
 
  );
}

export default App;
