import React, { useState, useEffect } from 'react'
import { getUserInfo, getToken } from '../../Cookies'
import { Link } from 'react-router-dom'
import { CardService } from '../../IU/CardService/CardService'
import './Services.css'
const urlApi = process.env.REACT_APP_API

export const Services = () => {

    const [servicesUser, setServicesUser] = useState([])

    const getService = async () => {
        const response = await fetch(`${urlApi}userservices/${getUserInfo().idduser}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        })
        const resjson = await response.json();
        setServicesUser( await resjson[0]);
    }

    const formatName = (name) => {
        return name.replace(/\s+/g, '-')
    }

    const deleteServices = async (idservice) => {
        const response = await fetch(`${urlApi}services/${idservice}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        })
        const resjson = await response.json();
        console.log(resjson);
    }

    useEffect(() => {
        getService()
    }, [])
    
    return (
        <div className='user_services'>
            {
                servicesUser.services?.map(item => (
                    <>                    
                        <Link className='link_card_service' to={`/service/${formatName(item.name)}/${item.idservice}`} key={item.idservice}>
                            <CardService object={item} />
                        </Link>
                        <p onClick={() => deleteServices(item.idservice)}>Eliminar</p>
                    </>
                ))                            
            }
        </div>
    )
}
