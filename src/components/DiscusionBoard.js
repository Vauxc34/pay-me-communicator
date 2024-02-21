import React, { useState, useEffect, useContext } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { useNavigate } from 'react-router-dom';
import { storage, app } from '../config';
import { toast } from 'react-toastify'; 
import io from "socket.io-client";

/* providers */

import { UserContext } from '../UserProvider';

/* providers */

/* */

import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

/* */

import TextField from '@mui/material/TextField';

const socket = io.connect("http://localhost:3004");

const DiscusionBoard = ({ 
  ArrayOfEveryUsers, 
  ConversationList, 
  SettingChatMobile, 
  NewSentMessages,
  setNewSentMessages,
  idConference 
}) => {
    
    let navigate = useNavigate()
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
                setAttachments(oldArray => [...oldArray, { id: Math.floor(Math.random() * 999), url__: downloadURL, type: 'normal_img' }] );
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
    const idUser =  User ? User.id : 0
    const isYourMessage =  User ? `${User.first_name + ' ' + User.last_name}` : 'no user'
    const [MessageToSend, setMessageToSend] = useState('')
    const [AreaExact, setAreaExact] = useState(-1)
    const [AreaSetted, setAreaSetted] = useState(false)

    const ViewPhotoArea = () => {
    function handleChange(event) { setFile(event.target.files[0]) }  

    let IsAttachmentImage = Attachments.find(item => item.type == 'normal_img')
    let FilteredImageAttachments = Attachments.filter(item => item.type == 'normal_img')

        return (
            <div className='viewPhotoArea'>
            <div className='Container__photo' style={{ margin: '0 10px' }}>
            <div className='placeholdPhoto'>
            <input className='FileSelector' type="file" onChange={handleChange}></input>
            <span>Attachment</span>
            <AddCircleOutlineIcon/>
            </div>
            </div>
            {IsAttachmentImage ? FilteredImageAttachments.map(item => <div className='Container__photo' style={{ margin: '0 5px' }}>
            <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>
            </div>) : ''}
            </div>
    )}

    const GifArea = () => {

    let [searchTerm, setSearchTerm] = useState('')
    let [Gifs, setGifs] = useState([])
    let [GifsEvery, setGifsEvery] = useState([])
    const [isSearched, setIsSearched] = useState(false)
    
    var apikey = process.env.REACT_APP_API_KEY_TENOR;
    var clientkey = process.env.REACT_APP_CLIENT_KEY_TENOR;
    var lmt = 26;
    
      var search_url = "https://tenor.googleapis.com/v2/search?q=" + searchTerm + "&key=" + apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
      var every_url = "https://tenor.googleapis.com/v2/search?q=" + 'random' + "&key=" + apikey +"&client_key=" + clientkey +  "&limit=" + lmt;

      const FindGif = (event) => {

        if (event.key === 'Enter') {

          setIsSearched(true)

          fetch(search_url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }}).then(res => res.json()).then(data => setGifs(data.results))
        }
      }      

      useEffect(() => {
          fetch(every_url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }}).then(res => res.json()).then(data => setGifsEvery(data.results))        
      }, [])

      let IsAttachmentGif = Attachments.find(item => item.type == 'gif')
      let FilteredGifAttachments = Attachments.filter(item => item.type == 'gif')
      
      return (

        <div className='gifsArea'>

        {IsAttachmentGif ? <>
        
        <h3 style={{ margin: '5px 0' }}>Selected:</h3>  

        <div className='viewPhotoArea' style={{ width: '100%' }}>
          {FilteredGifAttachments.map(item => <div className='Container__photo' style={{ margin: '0 5px' }}>
           <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>
          </div>)}
        </div>

        </> : null}

        <h3>Look for some meme</h3>

        <TextField style={{ margin: '10px 0px', background: '#ffffffc2', borderRadius: '5px', color: "black" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(event) => { FindGif(event)}}/>

        {isSearched == true ? '' : <div className='viewPhotoArea' style={{ width: '100%' }}>
        {GifsEvery.map(item => <div className='Container__photo' style={{ margin: '0 5px' }}>
        <div className='placeholdPhoto'
        onClick={() => { setAttachments(oldArray => [...oldArray, { id: Math.floor(Math.random() * 999), url__: item.media_formats.gif.url, type: 'gif' }] )}}
        style={{ backgroundImage: `url(${item.media_formats.gif.url})` }}></div>
        </div>)}
        </div>}

        <div className='viewPhotoArea' style={{ width: '100%' }}>
        {Gifs != [] ? Gifs.map(item => <div className='Container__photo' style={{ margin: '0 5px' }}>
        <div className='placeholdPhoto'
        onClick={() => { setAttachments(oldArray => [...oldArray, { id: Math.floor(Math.random() * 999), url__: item.media_formats.gif.url, type: 'gif' }] )}}
        style={{ backgroundImage: `url(${item.media_formats.gif.url})` }}></div>
        </div>) : ''}
        </div>

        </div>

      )

    }

    function SetViewArea() { 
      setAreaExact(0)
      setAreaSetted(true)
      if(AreaSetted == true) {
        setAreaExact(3)
        setAreaSetted(false)
      } else {
        setAreaExact(0)
      }
    }

    function SetViewArea1() {  
      
      setAreaExact(1)
      setAreaSetted(true)

      if(AreaSetted == true) {
        setAreaExact(3)
        setAreaSetted(false)
      } else {
        setAreaExact(1)
      }      
    }

    function RemoveConversation() {
      fetch(`${process.env.REACT_APP_API_URL}conversations/single-message/remove/${idConference}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(res => res.json()).then(toast.info('You Deleted succesfully')).then(window.location.reload(false))
    }

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
        }   

    }, [idConference])
    
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
      })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           setNewSentMessages(oldArray => [...oldArray, 
            { id: idUser,  attachment: Attachments, content: MessageToSend, user: isYourMessage
            }]
          )
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
        })
        }
    }
   
    const d = new Date();
    let time = d.getTime();

    const SenderFunction = () => { 
    SendAmessage() 
    sendMessageCollab()
    setNewSentMessages(oldArray => [...oldArray,  { id: idUser,  attachment: Attachments, content: MessageToSend, user: isYourMessage, date: time, isUser: true }])
    }

    useEffect(() => { localStorage.setItem("CollabolatorQuery", JSON.stringify(Query))}, [Query])

    const SingleCloudMess = (item) => { 

      let ParsedDataIds = AllChatsSingle.idUsers ? JSON.parse(AllChatsSingle.idUsers) : []
     
      let YouPicId = ParsedDataIds.find(item => item.id == idUser)
      let CollabPicId = ParsedDataIds.filter(item => item.id != idUser)

      let [ArrayAttachment, setArrayAttachment] = useState([])
      let ActualItem = item.item
      let ItemIndex = SingleChatMessages.findIndex(item => item.id == ActualItem.id)

      let lookingPhotoC = CollabPicId[0] === undefined ? 0 : NewUserList.find(item => item.id === CollabPicId[0].id)
      let lookingPhotoY = NewUserList.find(item => item.id === YouPicId.id)

      let ActualAttachments = JSON.parse(ActualItem.attachment)  
      useEffect(() => { if(ActualAttachments) {setArrayAttachment(ActualAttachments)}}, [])

        return (
        <div className={ActualItem.user == isYourMessage ? "messageItself Collabolator justify-end" : "messageItself You justify-start" }>
            {ActualItem.user == isYourMessage && lookingPhotoC != undefined ? null : <div className='profileUserSmaller' 
            style={{ backgroundImage: `url(${lookingPhotoC  == undefined ? '' : lookingPhotoC.profile_pic})` }}
            ></div>} 
            <div className='container--'>
                <h3 className={ActualItem.user == isYourMessage ? "right-text" : "left-text"}>{ActualItem.user}</h3>
                <span className={ActualItem.user == isYourMessage ? "mess_ Collabolator right-text" : "mess_ You left-text"}>{ActualItem.content}</span>
                <div className={ActualItem.user == isYourMessage ? "PhotoArea Collabolator justify-end" : "PhotoArea You justify-start" }>
                {ArrayAttachment == [] ? '' : ArrayAttachment.map(item => <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>)}
                 </div>
            </div>
            {ActualItem.user == isYourMessage && lookingPhotoY != undefined ? <div
            style={{ backgroundImage: `url(${lookingPhotoY == undefined ? '' : lookingPhotoY.profile_pic})` }}
            className='profileUserSmaller'></div> : null } 
        </div>
        )
    }

    const SingleCloudMessNew = (item) => { 

      let ParsedDataIds = AllChatsSingle.idUsers ? JSON.parse(AllChatsSingle.idUsers) : []
     
      let YouPicId = ParsedDataIds.find(item => item.id == idUser)
      let CollabPicId = ParsedDataIds.filter(item => item.id != idUser)

      let lookingPhotoC = CollabPicId[0] === undefined ? 0 : NewUserList.find(item => item.id === CollabPicId[0].id)
      let lookingPhotoY = NewUserList.find(item => item.id === YouPicId.id)

      let ActualItem = item.item
      let ActualAttachments = ActualItem.attachment

        return (
        <div className={ActualItem.user == isYourMessage ? "messageItself Collabolator justify-end" : "messageItself You justify-start" }>

            {ActualItem.user == isYourMessage && lookingPhotoC != undefined ? null : <div className='profileUserSmaller' 
            style={{ backgroundImage: `url(${lookingPhotoC  == undefined ? '' : lookingPhotoC.profile_pic})` }}
            ></div>} 

            <div className='container--'>
                <h3 className={ActualItem.user == isYourMessage ? "right-text" : "left-text"}>{ActualItem.user}</h3>
                <span className={ActualItem.user == isYourMessage ? "mess_ Collabolator right-text" : "mess_ You left-text"}>{ActualItem.content}</span>
                <div className={ActualItem.user == isYourMessage ? "PhotoArea Collabolator justify-end" : "PhotoArea You justify-start" }>
                {ActualAttachments == [] ? '' :  ActualAttachments.map(item => <div className='placeholdPhoto' style={{ backgroundImage: `url(${item.url__})` }}></div>)}
                 </div>
            </div>
            
            {ActualItem.user == isYourMessage && lookingPhotoY != undefined ? <div
            style={{ backgroundImage: `url(${lookingPhotoY == undefined ? '' : lookingPhotoY.profile_pic})` }}
            className='profileUserSmaller'></div> : null } 

        </div>
        )
    }

    const sendMessageCollab = () => { 
    socket.emit("send_message", { message: { id: idUser,  attachment: Attachments, content: MessageToSend, user: isYourMessage, date: time, isUser: false }})
    };

    useEffect(() => {
    socket.on("receive_message", (data) => { setNewSentMessages(Mess => [...Mess, data.message])});
    }, [socket]);

    const FilteredSentedNewArr  = NewSentMessages.filter((obj, index) => NewSentMessages.findIndex((item) => item.content === obj.content ) === index);
     
  return (

    <div className='MainPartDiscusion' ref={ConversationList} style={{ zIndex: -1 }}>
    <div className='up-section'>
        <div className={`container-row align-items-center w-90  space-around-between`}>

            {window.innerWidth < 819 ? <CloseIcon style={{ color: '#ff0000' }} onClick={SettingChatMobile}/> : null}
            <div className='container-row w-100 space-around-between'>
            <h3>{CollabolatorDetails[0] == undefined ? isYourMessage :  CollabolatorDetails[0].name + ' ' + CollabolatorDetails[0].surname}</h3>
            <div>
            <PhoneIcon style={{ margin: '0 5px 0 10px', color: '#fff', display: 'none' }}/>
            <AccountBoxIcon style={{ margin: '0 10px 0 5px', color: '#fff', cursor: 'pointer' }} onClick={() => { navigate(`/profile/${CollabolatorDetails[0] == undefined ? idUser : CollabolatorDetails[0].id}`) }}/>
            <DeleteForeverIcon style={{ margin: '0px', color: '#fff', cursor: 'pointer' }} onClick={RemoveConversation}/>
            </div>
            </div>
            </div>

    <hr className='w-90'></hr>
    </div>
    {SingleChatMessages == [] ? null : SingleChatMessages.map(item => <SingleCloudMess item={item} />)}
    {NewSentMessages == [] ? null : FilteredSentedNewArr.map(item => <SingleCloudMessNew  item={item} />)}
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
        {AreaExact == 0 ? <ViewPhotoArea/> : ''}
        {AreaExact == 1 ? <GifArea/> : ''}
        <hr className='w-90'></hr>
        <div className='container-row AdditionalThingsChat align-items-center'>
            <AddCircleOutlineIcon onClick={SetViewArea}/>
            <TextFieldsIcon onClick={SetViewArea1}/>
            <EmojiEmotionsIcon onClick={() => { picker.togglePicker() }}/>
            {/*<AlternateEmailIcon/>*/}
        </div>
    </div>

    </div>
  )
}

export default DiscusionBoard