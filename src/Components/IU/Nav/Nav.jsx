import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import './Nav.css'

export const Nav = () => {
    return (
        <nav className='nav_home'>
            <ul>
                <NavLink to='/dashboard/services'>Administrar servicios</NavLink>
                {/* <NavLink to='/chat'>Chat</NavLink> */}
            </ul>
        </nav>
    )
}