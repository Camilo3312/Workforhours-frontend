import React, { useState } from 'react'
import { Search } from '../../IU/Search/Search'
import { Link } from 'react-router-dom'
import { ReactComponent as IconSearch }  from '../../../Assets/Icons/IconSearch.svg'
import './NavSerach.css'
const urlApi = process.env.REACT_APP_API

export const NavSearch = () => {

    // const [search, setSearch] = useState('')
    const [services, setServices] = useState([])
    const [search, setSearch] = useState(false)
    
    const searcServices = async (info) => {
        if(info.length < 1) {
            info = "-"
            setSearch(false)
            setServices([])
        }
        const response = await fetch(`${urlApi}seeker/${info}`)
        const resjson = await response.json();
        if(resjson[0].idservice !== 0) {
            setServices(resjson)
            setSearch(true)
        } else {
            setServices([{idservice: null, name: "no se encontraron coincidencias"}])
        }
    }

    const formatName = (name) => {
        return name.replace(/\s+/g, '-')
    }
    
    return (
        <div className='nav_search'>
            <div className="center_nav_search">
                <div className='input_search'>
                    <IconSearch className='icon_search' />
                    <input onChange={e => searcServices(e.target.value)} className='search' type='search'placeholder='Buscar...' />
                </div>
                {
                    search && (
                        <div className="suggestions">
                            {
                                services?.map((item,index) => (
                                    <Link key={index} to={`service/${formatName(item.name)}/${item.idservice}`}>
                                        <IconSearch className='icon_search_suggestions' />
                                        <p>{item.name}</p>    
                                    </Link>
                                ))
                            }   
                        </div>  
                    )
                }
            </div>
        </div>
    )
}