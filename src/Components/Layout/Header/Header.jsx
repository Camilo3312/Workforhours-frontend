import React, { useState, useEffect } from 'react'
import { removeSessionCookie, getUserInfo } from '../../Cookies'
import { UserAuth } from '../../UserAuth'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Nav } from '../../IU/Nav/Nav'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import styled from 'styled-components'
import './Header.css'
const urlApi = process.env.REACT_APP_API

export const Header = () => {
    const navigate = useNavigate()

    const [connection, setConnection] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [messages, setMessages] = useState([])
    const [none, setNone] = useState(true)
    const [notification, setNotification] = useState(true)

    if (UserAuth()) {
        var { names, email, surnames, imageprofile } = getUserInfo()
    }

    const logout = () => {
        removeSessionCookie()
        navigate('/')
    }


    const connectRoomNotification = async (room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`${urlApi}notification`)
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReciveNotification", (user, imageuser, messagess, date) => {
                setMessages(messages => [...messages, { user, imageuser, messagess, date }])
            })

            connection.on("ShowWho", (message) => {
            })

            connection.onclose(e => {
                setConnection()
                setMessages([])
            });

            await connection.start()
            await connection.invoke("JoinRoom", { room })
            setConnection(connection)
        }
        catch (error) {
            console.log(error)
        }
    }

    const notf = (clas) => {
        if (messages.length !== 0) {
            return clas
        }
    }

    useEffect(() => {
        if (UserAuth()) {
            connectRoomNotification(String(getUserInfo().idduser))
        }
    }, [])

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <header className='header_pages'>
            <div className="center_header_pages">
                <div className='flex'>
                    <div className="logo">
                        <Link to='/'><h1>Work for Hours</h1></Link>
                    </div>
                </div>
                <div className="operations_header">
                    {
                        UserAuth() ?
                            <>
                                <div className='info_user'>
                                    <Nav />
                                    <NavLink className={notf('notification')} onMouseOver={() => setNotification(false)} onMouseDown={() => setNotification(true)} to='/chat'>Chat</NavLink>
                                    <img onClick={() => none ? setNone(false) : setNone(true)} className='img_profile_user' src={imageprofile} alt="" />
                                </div>
                                <Popup variant={notification}>
                                    {
                                        messages?.map(item => (
                                            <>
                                                <img src={item.imageuser} alt="" />
                                                <p onClick={logout} className='btn_logout_popup'>{item.user} {item.messagess}</p>
                                            </>
                                        ))
                                    }
                                </Popup>
                                <Popup variant={none}>
                                    <header className='header_popup_profile'>
                                        <img className='image_profile_popup' src={imageprofile} alt="" />
                                        <div className='info_user_popup'>
                                            <p className='names_profile_popup'>{names}</p>
                                            <p className='email_profile_popup'>{email}</p>
                                        </div>
                                    </header>
                                    <p onClick={logout} className='btn_logout_popup'>Perfil</p>
                                    <p onClick={logout} className='btn_logout_popup'>Cerrar sesión</p>
                                </Popup>
                            </>
                            :
                            <div>
                                <Link className='login_button' to='/login'>Ingresar</Link>
                                <Link className='register_button' to='/register'>Registrarse</Link>
                            </div>
                    }

                </div>
            </div>
        </header>
    )
}

const Popup = styled.div`
    border-radius: 5px;
    background: var(--blue);
    position: absolute;
    top: 60px;
    z-index: 2;
    display: ${props => props.variant ? 'none' : 'block'};
    box-shadow: 0px 0px 30px #3a3a3a32;
`