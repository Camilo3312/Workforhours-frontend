import React from 'react'
import './CardService.css'

export const CardService = ({object}) => {

    const { name, names, surnames, citie, departament, price, category, imageservice } = object
    return (
        <div className='card'>
            <div className='image_service_card'>
                <img src={imageservice} alt='image' />
            </div>
            <div className='info_service_card'>
                <header className='header_card'>
                    <p className='caregory'>{category}</p>
                </header>
                <div className='body_card'>
                    <p className='name_service'>{name}</p>
                    <p className='price_service'>${price} por hora</p>
                    <p className='location_service'>{citie} {departament}</p>
                </div>
            </div>
        </div>
    )
}
