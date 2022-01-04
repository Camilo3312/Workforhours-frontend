import React from 'react'
import './Select.css'

export const Select = ({children, funct}) => {

    return (
        <select onChange={e => funct(e.target.value)} className='select'>
            {children}
        </select>
    )
}
