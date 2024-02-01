import React, { useState, useEffect } from 'react'

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
    AdditionalList,
    SettingChatMobile
}) => {
  return (

    <div className='MainPartDiscusion' ref={ConversationList} style={{ zIndex: -1 }}>


    <div className='up-section'>
        <div className={`container-row align-items-center w-90  space-around-between`}>

            {window.innerWidth < 819 ? <CloseIcon style={{ color: '#ff0000' }} onClick={SettingChatMobile}/> : null}
            
            <div className='container-row'>

            <h3>Maciej Zachorowicz</h3>
            <PhoneIcon style={{ margin: '0 5px 0 10px', color: '#fff' }}/>
            <AccountBoxIcon style={{ margin: '0 10px 0 5px', color: '#fff' }}/>
            </div>

            </div>

    <hr className='w-90'></hr>

    </div>


    <div className='messageItself You justify-start'>

        <div className='profileUserSmaller'></div>

        <div className='container--'>
        <h3>Maciej Zachorowicz</h3>
        <span className='mess_ You'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
            Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>
        </div>

       
    </div>

    <div className='messageItself Collabolator justify-end'>

    <div className='container--' style={{ alignItems: 'flex-end', justifyContent: 'left' }}>

    <h3 className='right-text'>Maciej Zachorowicz</h3>
        <span className='mess_ Collabolator right-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
            Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>

    </div>

    <div className='profileUserSmaller'></div>
       
    </div>

    <div className='messageItself You justify-start'>

<div className='profileUserSmaller'></div>

<div className='container--'>
<h3>Maciej Zachorowicz</h3>
<span className='mess_ You'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
    Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>
</div>


</div>

<div className='messageItself Collabolator justify-end'>

<div className='container--' style={{ alignItems: 'flex-end', justifyContent: 'left' }}>

<h3 className='right-text'>Maciej Zachorowicz</h3>
<span className='mess_ Collabolator right-text'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
    Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>

</div>

<div className='profileUserSmaller'></div>

</div>

<div className='messageItself You justify-start'>

<div className='profileUserSmaller'></div>

<div className='container--'>
<h3>Maciej Zachorowicz</h3>
<span className='mess_ You'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
    Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>
</div>


</div>

<div className='messageItself Collabolator justify-end'>

<div className='container--' style={{ alignItems: 'flex-end', justifyContent: 'left' }}>

<h3 className='right-text'>Maciej Zachorowicz</h3>
<span className='mess_ Collabolator right-text'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales, suscipit felis eget, fermentum arcu. Aliquam tempor ipsum dolor. 
    Suspendisse et orci at dolor cursus vehicula. Cras condimentum ipsum euismod sem ultricies elementum.</span>

</div>

<div className='profileUserSmaller'></div>

</div>


    <div className='write-section'>

        <div className='container-row w-100 align-items-center justify-end'>
        <textarea>

        </textarea>


        <Button className='ButtonSenderMessage'>
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