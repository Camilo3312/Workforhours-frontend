import React, { useEffect } from 'react'
import { Header } from '../../Layout/Header/Header'
import { Link, Outlet, useParams } from 'react-router-dom'
import './Dashboard.css'

export const Dashboard = () => {
    return (
        <>
            <main className='main_dashboard'>
                <aside className='aside_dashboard'>
                    <Link className='' to='services'>
                        <p className=''>Home</p> 
                    </Link>
                    <Link className='btn_add_service_dashboard' to='services/add'>
                        <p className='subtitle_aside_dashboard'>Agregar servicios</p> 
                    </Link>
                </aside>
                <section className='info_dashboard'>
                    <Outlet />
                </section>
            </main>
        </>
    )
}
