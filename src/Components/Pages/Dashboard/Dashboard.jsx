import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Link, Outlet } from 'react-router-dom'
import './Dashboard.css'

export const Dashboard = () => {
    return (
        <>
            <Header />
            <main className='main_dashboard'>
                <aside className='aside_dashboard'>
                    <Link to='services/add'>Agregar servicios</Link>
                </aside>
                <section>                 
                    <Outlet/>
                </section>
            </main>
        </>
    )
}
