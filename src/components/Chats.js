import React from 'react'

const Chats = ({ SettingChatMobile }) => {

  
    return (
    <>
    
        <div className='conversation-part'>

            <br></br>

        <h3>Groups</h3>

<hr></hr>

<div className='ChatCloud' onClick={window.innerWidth < 819 ? SettingChatMobile : console.log('ok')}>
  <div className='profileUserSmaller'></div>
<div className='container--'>
<h3>Doradcy podatkowi</h3>
<span className='mess_ You'>Lorem ipsum dolor sit amet</span>
</div>
</div>

            <h3>Chats</h3>

            <hr></hr>

        <div className='ChatCloud'>
              <div className='profileUserSmaller'></div>
        <div className='container--'>
        <h3>Maciej Zachorowicz</h3>
        <span className='mess_ You'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem sodales</span>
        </div>
        </div>

        </div>

    </>
  )
}

export default Chats