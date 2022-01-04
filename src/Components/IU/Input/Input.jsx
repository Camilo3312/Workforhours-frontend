import React from 'react'
import './Input.css'

export const Input = ({ funct,...props }) => {
    return (
        <input className='input' onChange={e => funct(e.target.value)} className='input' {...props} />
    )
}