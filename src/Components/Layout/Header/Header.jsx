import React, { useState } from 'react'
import { removeSessionCookie, getUserInfo } from '../../Cookies'
import { UserAuth } from '../../UserAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from '../../IU/Nav/Nav'
import styled from 'styled-components'
import './Header.css'

export const Header = () => {
    const navigate = useNavigate()
    const [none, setNone] = useState(true)

    if (UserAuth()) {
        var { names, email, surnames, imageprofile } = getUserInfo()
    }

    const logout = () => {
        removeSessionCookie()
        navigate('/')
    }

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
                                    <img onClick={() => none ? setNone(false) : setNone(true)} className='img_profile_user' src={imageprofile} alt="" />
                                </div>
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