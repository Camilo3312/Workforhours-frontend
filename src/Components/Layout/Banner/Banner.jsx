import React from 'react'
import banner from '../../../Assets/Images/Pintor.jpg'
import './Banner.css'

export const Banner = () => {
    return (
        <div className='banner'>
            <img className='image_banner' src="https://media.istockphoto.com/photos/garden-worker-trimming-plants-picture-id1166203849?k=20&m=1166203849&s=612x612&w=0&h=UVoI3c9o4DljCFxpRpJznJE5zONRgo9sxeyysO7xVZw=" alt="" />
            <div className="filter_banner">
                <div className="center_banner">
                    <div className="info_banner">
                        <h1 className='title_banner'>Work for hours</h1>
                        <p className='paragraph'>Lorem ipsum dolor sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium repudiandae cum quos velit quo quae sapiente ea, </p>
                    </div>
                </div>
            </div>
        </div>
    )
}