import React, { useState, useEffect, Suspense, lazy } from 'react'
import { getUserInfo, getToken } from '../../Cookies'
import { CardChatLoad } from '../../IU/LoadComponets/CardChatLoad/CardChatLoad'
import './SwitchChat.css'
const CardChat = lazy(()=> import('../../IU/CardChat/CardChat'))
const urlApi = process.env.REACT_APP_API

const arr = [
    {
        idroom: 19,
        notification: "Message"
    },
    {
        idroom: 10,
        notification: "Message 2"
    }
]

export const SwitchChat = ({ setCurrentRoom, connectRoom, closeConnection, setCurrentUser, connectRoomNotification }) => {
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
        const newList = rooms?.map((item) => {
            arr.map((itemArr)=> {
                return itemArr.idroom == item.idroom
            }) 
        })

        console.log(newList);

    }, [])

    const connect = (room, user) => {
        closeConnection()
        setCurrentRoom(String(room))
        connectRoomNotification(String(user))
        const currentUser = rooms.filter(item => {
            return item.idroom === parseInt(room)
        })
        setCurrentUser(...currentUser)
        connectRoom(String(room))
    }

    return (
        <div className='switch_chat'>
            <h1 className='title_switch_chat'>Chat</h1>
            <div className='scroll_switch_chat'>
                {
                    rooms?.map((item, index) => (
                        <Suspense key={index} fallback={<CardChatLoad/>}>
                            <CardChat object={item} connect={connect}  notification={''} />
                        </Suspense>
                    ))
                }
            </div>
        </div>
    )
}