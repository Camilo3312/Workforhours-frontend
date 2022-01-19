import React, { useState, useEffect } from 'react'
import { SwitchChat } from '../../Layout/SwitchChat/SwitchChat'
import { Header } from '../../Layout/Header/Header'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { getToken, getUserInfo } from '../../Cookies'
import { Messages } from '../../Layout/Mesages/Messages'
import { RateServices } from '../../Layout/RateServices/RateServices'
import { ReactComponent as RowLeft } from '../../../Assets/Icons/RowLeft.svg'
import { ReactComponent as Message } from '../../../Assets/Icons/Message.svg'
import styled from 'styled-components'
import './Chat.css'

const urlApi = process.env.REACT_APP_API

export const Chat = () => {
    
    const [connection, setConnection] = useState()
    const [connectionMessage, setConnectionMessage] = useState()
    const [clicked, setClicked] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [currentRoom, setCurrentRoom] = useState('')

    const connectRoomNotification = async (room) => {
        try {
            const connectionMessage = new HubConnectionBuilder()
                .withUrl(`${urlApi}notification`)
                .configureLogging(LogLevel.Information)
                .build();

                connectionMessage.on("ReciveNotification", (user, messagess, date) => {
                
            })

            connectionMessage.on("ShowWho", (message) => {
                console.log('user connected', message);
            })

            connectionMessage.onclose(e => {
                setConnection()
                setMessages([])
            });

            await connectionMessage.start()
            await connectionMessage.invoke("JoinRoom", { room })
            setConnectionMessage(connectionMessage)
        }
        catch (error) {
            console.log(error)
        }
    }

    const notification = async (room, user, message, date) => {
        try {
            let imageuser = String(getUserInfo().imageprofile)
            await connectionMessage.invoke("SendNotification", { room, user, imageuser, message, date })
        } catch (e) {
            console.log(e);
        }
    }

    const getMessage = async () => {
        const response = await fetch(`${urlApi}messages/${currentRoom}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        })
        const resjson = await response.json();
        if(resjson.value !== false) {
            setMessages(resjson);          
        }
    }

    const saveMessage = async (idroom,message,date,iduser) => {
        const response = await fetch(`${urlApi}messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            },
            body: JSON.stringify({
                idroom: idroom,
                message: message,
                date: date,
                iduser: iduser
            })
        })
        const resjson = await response.json()
    }

    const connectRoom = async (room) => {
        try {
            setClicked(true)
            const connection = new HubConnectionBuilder()
                .withUrl(`${urlApi}chat`)
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReciveMessage", (user, messagess, date) => {
                setMessages(messages => [...messages, { user, messagess, date }])
            })

            // connection.on("ShowWho", (message) => {
            //     console.log('user connected', message);
            // })

            connection.onclose(e => {
                setConnection()
                setMessages([])
            });

            await connection.start()
            await connection.invoke("AddToGroup", { room })
            setConnection(connection)
        }
        catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async (room, user, message, date) => {
        try {
            await connection.invoke("SendMessage", { room, user, message, date })
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
          await connection.stop();
        } catch (e) {
          console.log(e);
        }
    }

    useEffect(()=> {
        document.title = 'Chat'
    },[])

     useEffect(()=> {
        if(connection) {
            getMessage()
        }
    },[connection])

    return (
        <div>
            <main className='main_chat'>
                <ContainerSwitchChat clicked={clicked}>
                    <SwitchChat setCurrentRoom={setCurrentRoom} connectRoom={connectRoom} closeConnection={closeConnection} setCurrentUser={setCurrentUser} connectRoomNotification={connectRoomNotification}/>
                </ContainerSwitchChat>
                {
                    clicked ? 
                        <ContainerMessages clicked={clicked}>
                            <header className='header_info_user_selected'>
                                <ButtonExitChat onClick={() => clicked ? setClicked(false) : setClicked(true)}>
                                    <RowLeft className='row_left'/>
                                </ButtonExitChat>
                                <div className='flex_profile_user_select'>
                                    <img className='img_profile_user_selected' src={currentUser.imageprofile} alt="" />
                                    <p className='name_current_user'>{currentUser.names}</p>
                                </div>

                                <img className='img_service_user_selected' src={currentUser.imageservice} alt="" />
                            </header>
                            <RateServices/>
                            <Messages sendMessage={sendMessage} messages={messages} currentRoom={currentRoom} saveMessage={saveMessage} notification={notification} currentUser={currentUser} />
                        </ContainerMessages>
                    :
                        <div className='chat_prevew'>
                            <Message className='icon_message'/>
                        </div>
                }
            </main>
        </div>
    )
}

const ContainerSwitchChat = styled.div`
    width: 30%;
    @media screen and (max-width: 650px) {
        width: 100%;
        display: ${props => props.clicked ? 'none' : 'block'};
    }
`
const ContainerMessages = styled.div`
    width: 70%;
    @media screen and (max-width: 650px) {
        width: 100%;
        display: ${props => props.clicked ? 'block' : 'none'};
    }   
`

const ButtonExitChat = styled.button`
    border: none;
    text-align: center;
    background: transparent;
    margin: 0 10px 0 0;
    @media screen and (min-width: 650px) {
        display: none;
    }
`