import React, { useState, useEffect, Suspense, lazy } from 'react'
import { SwitchChat } from '../../Layout/SwitchChat/SwitchChat'
import { Header } from '../../Layout/Header/Header'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { getToken } from '../../Cookies'
import { Messages } from '../../Layout/Mesages/Messages'
import { RateServices } from '../../Layout/RateServices/RateServices'
import styled from 'styled-components'
import './Chat.css'

const urlApi = process.env.REACT_APP_API

export const Chat = () => {
    const [connection, setConnection] = useState()
    const [clicked, setClicked] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [currentRoom, setCurrentRoom] = useState('')

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
            <Header />
            <main className='main_chat'>
                <ContainerSwitchChat clicked={clicked}>
                    <SwitchChat setCurrentRoom={setCurrentRoom} connectRoom={connectRoom} closeConnection={closeConnection} setCurrentUser={setCurrentUser}/>
                </ContainerSwitchChat>
                {
                    clicked && (
                        <ContainerMessages clicked={clicked}>
                            <header className='header_info_user_selected'>
                                <button onClick={()=> clicked ? setClicked(false) : setClicked(true)}>Exit</button>
                                <img className='img_profile_user_selected' src={currentUser.imageprofile} alt="" />
                                <p className='name_current_user'>{currentUser.names}</p>
                            </header>
                            <RateServices/>
                            <Messages sendMessage={sendMessage} messages={messages} currentRoom={currentRoom} saveMessage={saveMessage}/>
                        </ContainerMessages>
                    )
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