import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { getToken, getUserInfo } from '../../Cookies'
import { Header } from '../../Layout/Header/Header'
import { Link } from 'react-router-dom'
import { Button } from '../../IU/Button/Button'
import './InfoService.css'
const urlApi = process.env.REACT_APP_API

export const InfoService = () => {
    const navigate = useNavigate()

    const params = useParams();

    const [service, setService] = useState({});

    const getService = async () => {
        const response = await fetch(`${urlApi}services/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        })
        const resjson = await response.json();
        setService(await resjson[0]);
    }

    const createRoom = async () => {
        const response = await fetch(`${urlApi}rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            },
            body: JSON.stringify({
                iduser1: service.iduser,
                iduser2: getUserInfo().idduser,
                idservice: service.idservice
            })
            
        })
        const resjson = await response.json();
        navigate('/chat')
    }

    const redirect = () => {
        navigate(`/profile/user/${service.iduser}`)
    }

    useEffect(() => {
        getService()
        document.title = params.name.split('-').join(' ')
    }, []) 

    return (
        <>
            <Header />
            <main>
                <div className="center_main_infoservice">
                    <div className="information">       
                        <div className='image_service' >
                            <p className='subtitle_info_service'>Trabajos realizados por {service.names}</p>
                            <div className="image_info_service">
                                <img src={service.imageservice} alt="" />
                            </div>
                        </div>
                        <div className="info_service">
                            <header className="header_info_service">
                                <div className="info_user">
                                    <Link to={`/profile/user/${service.iduser}`}> <img className='image_user' src={service.imageprofile} alt="" /></Link>
                                    <p className='name_user_info'>{service.names}</p>
                                </div>
                            </header>
                            <div className='body_info_service'>
                                <p className='subtitle_body_info_service'>Categoria</p>
                                <p className='category_info_service'>{service.category}</p>
                                <h1 className='tilte_info_service' >{service.name}</h1>
                                <p className='subtitle_body_info_service'>Descripción</p>
                                <p className='description_info_service'>{service.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatum itaque nesciunt accusantium accusamus? Ea laudantium, id inventore ipsam impedit totam, sapiente praesentium quas eum modi sequi. Fuga, pariatur soluta.</p>
                                <p className='subtitle_body_info_service'>Precio por hora</p>
                                <p className='price_info_service'>${service.price} por hora</p>
                                <p className='subtitle_body_info_service'>Ubicación</p>
                                <p className='location_info_service' >{service.citie}  {service.departament}</p>
                                <button onClick={createRoom}>Contactar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}