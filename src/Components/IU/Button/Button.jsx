import React from 'react'
import './Button.css'

export const Button = ({value}) => {
    return (
        <button className='button' type='submit'>{value}</button>
    )
}
