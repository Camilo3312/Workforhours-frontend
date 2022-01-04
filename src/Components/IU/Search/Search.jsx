import React from 'react'
import './Search.css'

export const Search = ({funct, searcServices, ...props}) => {
    return (
        <>
        <input onChange={e => {funct(e.target.value); searcServices()}} className='search' type='search' {...props} />
        </>
    )
}