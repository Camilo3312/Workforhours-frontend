import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Header } from '../../Layout/Header/Header'
import { Link } from 'react-router-dom'
import './Home.css'
import { UserAuth } from '../../UserAuth'
import { Banner } from '../../Layout/Banner/Banner'
import { NavSearch } from '../../Layout/NavSearch/NavSearch'
import { CardService } from '../../IU/CardService/CardService'

const urlApi = process.env.REACT_APP_API

export const Home = () => {

    const [services, setServices] = useState([]);

    const getServices = async () => {
        const response = await fetch(`${urlApi}getservices`).catch(()=> {
            alert('Error al mostrar los servicios')
        })
        const resjson = await response.json();
        setServices(await resjson);
    }

    const formatName = (name) => {
        return name.replace(/\s+/g, '-')
    }

    useEffect(() => {
        getServices()
        document.title = 'Work for Hours | Servicios'
    }, [])

    return (
        <>
            <Header/>              
            <Banner/>           
            <NavSearch/>
            <main className='main_home'>
                <div className="center_main">
                    {
                        services?.map(item => (
                            
                            <Link className='link_card_service' to={ UserAuth() ? `service/${formatName(item.name)}/${item.idservice}` : '/login' } key={item.idservice} > <Suspense fallback={<p>Hola</p>} ><CardService object={item} /></Suspense> </Link>
                        ))
                    }
                </div>              
            </main>
        </>
    )
}
