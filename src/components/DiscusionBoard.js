import React, { useState, useEffect, useContext } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage, app } from '../config';

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
    idConference
}) => {

    const [NewUserList, setNewUserList] = useState([])  

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}users/list`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setNewUserList(data.content))
    }, [])

    const [Attachments, setAttachments] = useState([])
    const [file, setFile] = useState("")

    const SendAPhoto = () => {
        if (file !== '') {
          const uniqueImgName = Math.floor(Math.random() * 500) + '-' + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, `/communicator_chat_attachments/${idConference}/${uniqueImgName}`);
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
                setAttachments(oldArray => [...oldArray, { id: Math.floor(Math.random() * 999), url__: downloadURL }] );
              });
            }
          );
        } else {
          console.log('No photo selected');
        }
    };
    
    useEffect(() => { SendAPhoto() }, [file]);

    const CollabolatorDetails = JSON.parse(localStorage.getItem("SettedCollab")) ?? 'Collabolator'
    const userContext = useContext(UserContext);
    const { User, ConversationSetter } = userContext
    const [AllChatsSingle, setAllChatsSingle] = useState([])
    const [SingleChatMessages, setSingleChatMessages] = useState([]) 
    const [idUser, setIdUser] = useState(User ? User.id : 0)
    const isYourMessage =  User ? `${User.first_name + ' ' + User.last_name}` : 'no user'
    const [MessageToSend, setMessageToSend] = useState('')
    const [ifAreaSetted, setIfAreaSetted] = useState(0)

    const ViewPhotoArea = () => {
    function handleChange(event) { setFile(event.target.files[0]) }  
        return (
            <div className='viewPhotoArea'>
            <div className='Container__photo' style={{ margin: '0 10px' }}>
            <div className='placeholdPhoto'>
            <input className='FileSelector' type="file" onChange={handleChange}></input>
            <span>Attachment</span>
            <AddCircleOutlineIcon/>
            </div>
            </div>

            {Attachments != [] ? Attachments.map(item => <div className='Container__photo' style={{ margin: '0 5px' }}>
            <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>
            </div>) : ''}

            </div>
    )}

    function SetViewArea() { setIfAreaSetted(ifAreaSetted + 1) }

    const picker = new window.EmojiButton()
    picker.on('emoji', emoji => {
        document.getElementById('text___').value += emoji;
        setMessageToSend(document.getElementById('text___').value)
    });

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
                attachments: Attachments,
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
                attachments: Attachments,
                id: AllChatsSingle.id, 
                IdU:idUser
                })
        }).then(res => res.json()).then(window.location.reload(false))
        }
    }

    const Preloading = () => { window.location.reload(false) }

    const SenderFunction = () => { SendAmessage() 
    Preloading()}

    useEffect(() => { localStorage.setItem("CollabolatorQuery", JSON.stringify(Query))}, [Query])

    const SingleCloudMess = (item) => { 

      let ParsedDataIds = JSON.parse(AllChatsSingle.idUsers)
     
      let YouPicId = ParsedDataIds.find(item => item.id == idUser)
      let CollabPicId = ParsedDataIds.filter(item => item.id != idUser)

      let [ArrayAttachment, setArrayAttachment] = useState([])
      let ActualItem = item.item
      let ItemIndex = SingleChatMessages.findIndex(item => item.id == ActualItem.id)

      let lookingPhotoC = CollabPicId[0] == undefined ? 0 : NewUserList.find(item => item.id == CollabPicId[0].id)
      let lookingPhotoY = NewUserList.find(item => item.id == YouPicId.id)

      let ActualAttachments = JSON.parse(ActualItem.attachment)  
      useEffect(() => { if(ActualAttachments) {setArrayAttachment(ActualAttachments)}}, [])

        return (
        <div className={ActualItem.user == isYourMessage ? "messageItself Collabolator justify-end" : "messageItself You justify-start" }>
            {ActualItem.user == isYourMessage ? null : <div className='profileUserSmaller' 
            style={{ backgroundImage: `url(${lookingPhotoC.profile_pic  == undefined ? '' : lookingPhotoC.profile_pic})` }}
            ></div>} 
            <div className='container--'>
                <h3 className={ActualItem.user == isYourMessage ? "right-text" : "left-text"}>{ActualItem.user}</h3>
                <span className={ActualItem.user == isYourMessage ? "mess_ Collabolator right-text" : "mess_ You left-text"}>{ActualItem.content}</span>
                <div className={ActualItem.user == isYourMessage ? "PhotoArea Collabolator justify-end" : "PhotoArea You justify-start" }>
                {ArrayAttachment == [] ? '' : ArrayAttachment.map(item => <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>)}
                 </div>
            </div>
            {ActualItem.user == isYourMessage ? <div
            style={{ backgroundImage: `url(${lookingPhotoY.profile_pic == undefined ? '' : lookingPhotoY.profile_pic})` }}
            className='profileUserSmaller'></div> : null } 
        </div>
        )

    }
     
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
    {SingleChatMessages == [] ? null : SingleChatMessages.map(item => <SingleCloudMess item={item} />)}
    <div className='write-section'>

        <div className='container-row w-100 align-items-center justify-end'>
        <textarea
        id={"text___"}
        onKeyDown={handleKeyDown}
        value={MessageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
        ></textarea>
        <Button className='ButtonSenderMessage' onClick={SenderFunction}>
        <SendIcon/>
        </Button>
        </div>
        {ifAreaSetted % 2 ? <ViewPhotoArea/> : ''}
        <hr className='w-90'></hr>
        <div className='container-row AdditionalThingsChat align-items-center'>
            <AddCircleOutlineIcon onClick={SetViewArea}/>
            {/*<TextFieldsIcon/>*/}
            <EmojiEmotionsIcon onClick={() => { picker.togglePicker() }}/>
            {/*<AlternateEmailIcon/>*/}
        </div>
    </div>

    </div>
  )
}

export default DiscusionBoard