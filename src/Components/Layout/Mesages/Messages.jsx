import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../../IU/Button/Button'
import { getUserInfo } from '../../Cookies'
import './Messages.css'

export const Messages = ({ sendMessage, messages, currentRoom, saveMessage }) => {

    const [message, setMessage] = useState('')
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
                                <div className='message_chat'>
                                    <p className='_message'>{item.messagess}</p>
                                    <p className='date_message'>{item.date}</p>
                                </div>                   
                            </div>
                        </div>
                    ))
                }
            </div>
            <form className='send_message' onSubmit={e => {
                e.preventDefault()
                sendMessage(currentRoom, getUserInfo().names, message, currentDateTime())
                saveMessage(currentRoom, message, currentDateTime(), getUserInfo().idduser)
                setMessage('')
            }}>
                <input className='input_send_message' type='text' onChange={e => setMessage(e.target.value)} value={message} placeholder='Mensaje' />
                <Button value='Enviar' />
            </form>
        </div>
    )
}