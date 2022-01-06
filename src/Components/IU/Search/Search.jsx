import React from 'react'
import { ReactComponent as IconSearch }  from '../../../Assets/Icons/IconSearch.svg'
import './Search.css'

export const Search = ({funct, searcServices, ...props}) => {
    return (
        <div className='input_search'>
            <IconSearch className='icon_search' />
            <input onChange={e => {funct(e.target.value); searcServices()}} className='search' type='search' {...props} />
        </div>
    )
}