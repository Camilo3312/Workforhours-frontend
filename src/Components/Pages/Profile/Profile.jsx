import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getToken } from '../../Cookies'
import { CardService } from '../../IU/CardService/CardService'
import { Header } from '../../Layout/Header/Header'
import './Profile.css'
const urlApi = process.env.REACT_APP_API

export const Profile = () => {
    const params = useParams()
    const [servicesUser, setServicesUser] = useState([])

    const getService = async () => {
        const response = await fetch(`${urlApi}userservices/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        })
        const resjson = await response.json();
        setServicesUser(await resjson[0]);
    }

    const formatName = (name) => {
        return name.replace(/\s+/g, '-')
    }

    useEffect(() => {
        getService()
    }, [])

    return (
        <>
            <main>
                <div className="center_main_profile">
                    <aside className='aside_info_user'>
                        <div className='sticky'>
                            <div className="image_user_profile">
                                <img src={servicesUser.imageprofile} alt="" />
                            </div>
                            <div>
                                <p className='name_user_profile'>{servicesUser.names} {servicesUser.surnames}</p>
                                <p className='subtitle_user_profile'>Contacto</p>
                                <p className='email_user_profile'>{servicesUser.email}</p>
                                <p className='phone_user_profile'>{servicesUser.phone}</p>
                            </div>
                        </div>
                    </aside>
                    <section className='section_user_services'>
                        <p className='subtitle_user_profile_services'>Servicios publicados</p>
                        <div className="user_services">
                            {
                                servicesUser.services?.map(item => (
                                    <Link className='link_card_service' to={`/service/${formatName(item.name)}/${item.idservice}`} key={item.idservice}><CardService object={item} /></Link>
                                ))                            
                            }
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}