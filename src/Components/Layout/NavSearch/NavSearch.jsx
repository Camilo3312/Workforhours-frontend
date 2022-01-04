import React, { useState } from 'react'
import { Search } from '../../IU/Search/Search'
import { Link } from 'react-router-dom'
import './NavSerach.css'
const urlApi = process.env.REACT_APP_API

export const NavSearch = () => {

    // const [search, setSearch] = useState('')
    const [services, setServices] = useState([])
    
    const searcServices = async (info) => {
        const response = await fetch(`${urlApi}seeker/${info}`)
        const resjson = await response.json();
        setServices(resjson)
        if(resjson[0].idservice === 0) {
            setServices([])
        }

        console.log(resjson);
    }

    const formatName = (name) => {
        return name.replace(/\s+/g, '-')
    }
    
    return (
        <div className='nav_search'>
            <div className="center_nav_search">
                {/* <input type="text" onChange={e => searcServices(e.target.value)} /> */}
                <Search placeholder='Buscar'/>
                {
                    services?.map(item=> (
                        <Link to={`service/${formatName(item.name)}/${item.idservice}`}>{item.name}</Link>
                    ))
                }
            </div>
        </div>
    )
}