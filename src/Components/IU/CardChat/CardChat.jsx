import React from 'react'
import './CardChat.css'

const CardChat = ({ object, connect, notification = "" }) => {
    return (
        <div className='link_switch_chat' onClick={e => connect(object.idroom, object.iduser)}>
            <div className="header_swith_chat">
                <p>{object.nameservice}</p>
            </div>
            <div className="chat_user">
                <div className='info_user_switch_chat'>
                    <img className='image_chat_user' src={object.imageprofile} alt="" />
                    <p>{object.names} {object.surnames}</p>
                </div>
                <img className='image_chat_service' src={object.imageservice} alt="" />
                {/* <p>notification</p>  */}
            </div>
        </div>
    )
}

export default CardChat