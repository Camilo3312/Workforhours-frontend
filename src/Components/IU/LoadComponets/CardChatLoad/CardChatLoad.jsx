import React from 'react'
import './CardChatLoad.css'

export const CardChatLoad = () => {
    return (
        <div className='link_switch_chat'>
            <div className="header_swith_chat_load">
                <p className='text_card_chat_load'></p>
            </div>
            <div className="chat_user">
                <div className='info_user_switch_chat'>
                    <div className='image_chat_user' alt="" />
                    <p className='text_card_chat_load'></p>
                </div>
                <div className='image_chat_service' alt="" />
            </div>
            <div className="shadow_load"></div>
            <div className="shadow_load_two"></div>
        </div>
    )
}