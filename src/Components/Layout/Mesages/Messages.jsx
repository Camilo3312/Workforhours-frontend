import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../../IU/Button/Button'
import { getUserInfo } from '../../Cookies'
import { ReactComponent as Menu } from '../../../Assets/Icons/Menu.svg'
import styled from 'styled-components'
import './Messages.css'

export const Messages = ({ sendMessage, messages, currentRoom, saveMessage, notification, currentUser }) => {

    const [message, setMessage] = useState('')
    const [ishover, setIsHover] = useState(false)
    const [cliked, setCliked] = useState('cliked')
    const messageRef = useRef();

    const classMessage = (user) => {
        if (user === getUserInfo().names) {
            return 'rigth'
        } else {
            return 'left'
        }
    }

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const currentDateTime = () => {
        var time = new Date();
        let currentDate = time.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric'}).split('/').join('-')
        let currentTime = time.toLocaleString('es-CO', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })  
        return currentDate + ' ' + currentTime
    }

    return (
        <div className='container_messages'>
            <div ref={messageRef} className="show_messages">
                {
                    messages?.map((item, index) => (
                        <div key={index} className={`conatiner_message ${classMessage(item.user)}`}>
                            <div className='limit'>
                                <div className='aux'>
                                    <BtnOptionMessage ishover={ishover} className='option_menu'>
                                        <Menu className='icon_menu' />
                                    </BtnOptionMessage>
                                    <div className='message_chat' >
                                        <p className='_message'>{item.messagess}</p>
                                        <p className='date_message'>{item.date}</p>
                                    </div>                   
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <form className='send_message' onSubmit={e => {
                e.preventDefault()
                if(message)
                    sendMessage(currentRoom, getUserInfo().names, message, currentDateTime())
                    saveMessage(currentRoom, message, currentDateTime(), getUserInfo().idduser)
                    notification(String(currentUser.iduser),getUserInfo().names, message, currentDateTime())
                    setMessage('')
            }}>
                <input className='input_send_message' type='text' onChange={e => setMessage(e.target.value)} value={message} placeholder='Mensaje' />
                <Button value='Enviar' />
            </form>
        </div>
    )
}

const BtnOptionMessage = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    margin: 0 6px;
    z-index: 2;
    padding: 5px 8px;
    border-radius: 5px;
    background: var(--blue);
    display: flex;
    align-items: center;
    transition: all ease 100ms;
    &:hover {
        cursor: pointer;
    }
`

const OptionMessage = styled.div`
    position: absolute;
    padding: 10px;
    right: -35px;
    bottom: 110%;
    z-index: 3;
    background: var(--blue);    
    border-radius: 5px;
    box-shadow: 0px 0px 30px #3a3a3a32;
    color: #FFFF;
`