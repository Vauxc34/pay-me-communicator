import React, { useState, useEffect, useContext } from 'react'

/* providers */

import { UserContext } from '../UserProvider';

/* providers */

/* */

import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const DiscusionBoard = ({ 
    ConversationList,
    SettingChatMobile,
    idConference,
    SettedCollab
}) => {

    const CollabolatorDetails = JSON.parse(localStorage.getItem("SettedCollab")) ?? 'Collabolator'
    const userContext = useContext(UserContext);
    const { User, ConversationSetter } = userContext
    const [AllChatsSingle, setAllChatsSingle] = useState([])
    const [SingleChatMessages, setSingleChatMessages] = useState([]) 

    const [idUser, setIdUser] = useState(User ? User.id : 0)
    const isYourMessage =  User ? `${User.first_name + ' ' + User.last_name}` : 'no user'
    const [MessageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}conversations/message/${idUser}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idConf: idConference
            })
        }).then(res => res.json()).then(data => setAllChatsSingle(data.content[0]))
    }, [idUser, idConference])

    useEffect(() => {
        if(idConference != 0) {
            fetch(`${process.env.REACT_APP_API_URL}conversations/message/${idUser}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idConf: idConference
                })
            }).then(res => res.json()).then(data => setSingleChatMessages(JSON.parse(data.content[0].messages)))
        } else { }
    }, [idUser, idConference])

    let Query = SingleChatMessages.filter(item => item.user != isYourMessage)

    const SendAmessage = () => {
    fetch(`${process.env.REACT_APP_API_URL}conversations/single-message/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                User: isYourMessage, 
                content: MessageToSend, 
                id: AllChatsSingle.id, 
                IdU:idUser
            })
    }).then(res => res.json())
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetch(`${process.env.REACT_APP_API_URL}conversations/single-message/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    User: isYourMessage, 
                    content: MessageToSend, 
                    id: AllChatsSingle.id, 
                    IdU:idUser
                })
        }).then(res => res.json()).then(window.location.reload(false))
        }
    }

    const Preloading = () => { window.location.reload(false) }

    const SenderFunction = () => {
    SendAmessage()
    Preloading()
    }

    useEffect(() => { localStorage.setItem("CollabolatorQuery", JSON.stringify(Query))}, [Query])
     
  return (

    <div className='MainPartDiscusion' ref={ConversationList} style={{ zIndex: -1 }}>

    <div className='up-section'>
        <div className={`container-row align-items-center w-90  space-around-between`}>

            {window.innerWidth < 819 ? <CloseIcon style={{ color: '#ff0000' }} onClick={SettingChatMobile}/> : null}
            <div className='container-row w-100 space-around-between'>
            <h3>{CollabolatorDetails[0] == undefined ? isYourMessage : CollabolatorDetails[0].name + ' ' + CollabolatorDetails[0].surname}</h3>
            <div>
            <PhoneIcon style={{ margin: '0 5px 0 10px', color: '#fff', display: 'none' }}/>
            <AccountBoxIcon style={{ margin: '0 10px 0 5px', color: '#fff' }}/>
            </div>
            </div>
            </div>

    <hr className='w-90'></hr>
    </div>
{SingleChatMessages == [] ? null : SingleChatMessages.map(item => <>
<div className={item.user == isYourMessage ? "messageItself Collabolator justify-end" : "messageItself You justify-start" }>
{item.user == isYourMessage ? null : <div className='profileUserSmaller'></div>} 
<div className='container--'>
<h3 className={item.user == isYourMessage ? "right-text" : "left-text"}>{item.user}</h3>
<span className={item.user == isYourMessage ? "mess_ Collabolator right-text" : "mess_ You left-text"}>{item.content}</span>
</div>
{item.user == isYourMessage ? <div className='profileUserSmaller'></div> : null } 
</div>
</>)}
    <div className='write-section'>

        <div className='container-row w-100 align-items-center justify-end'>
        <textarea
        onKeyDown={handleKeyDown}
        value={MessageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
        ></textarea>
        <Button className='ButtonSenderMessage' onClick={SenderFunction}>
        <SendIcon/>
        </Button>
        </div>

        <hr className='w-90'></hr>

        <div className='container-row AdditionalThingsChat align-items-center'>
            <AddCircleOutlineIcon/>
            <TextFieldsIcon/>
            <EmojiEmotionsIcon/>
            <AlternateEmailIcon/>
        </div>
    </div>

    </div>
  )
}

export default DiscusionBoard