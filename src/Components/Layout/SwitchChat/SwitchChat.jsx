import React, { useState, useEffect, Suspense, lazy } from 'react'
import { getUserInfo, getToken } from '../../Cookies'
import { CardChatLoad } from '../../IU/LoadComponets/CardChatLoad/CardChatLoad'
// import CardChat from '../../IU/CardChat/CardChat'
import './SwitchChat.css'
const CardChat = lazy(()=> import('../../IU/CardChat/CardChat'))
const urlApi = process.env.REACT_APP_API

export const SwitchChat = ({ setCurrentRoom, connectRoom, closeConnection, setCurrentUser }) => {
    const [rooms, setRooms] = useState([])

    const getRooms = async () => {
        const response = await fetch(`${urlApi}rooms/${getUserInfo().idduser}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        }).catch(error => console.log(error))
        const resjson = await response.json();
        if (resjson.value !== false) {
            setRooms(resjson);
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

    const connect = (room, user) => {
        closeConnection()
        setCurrentRoom(String(room))
        const currentUser = rooms.filter(item => {
            return item.iduser === parseInt(user)
        })
        setCurrentUser(...currentUser)
        connectRoom(String(room))
    }

    return (
        <div className='switch_chat'>
            <h1 className='title_switch_chat'>Chat</h1>
            {
                rooms?.map((item, index) => (
                    <Suspense key={index} fallback={<CardChatLoad/>}>
                        <CardChat object={item} connect={connect} />
                    </Suspense>
                ))
            }
        </div>
    )
}