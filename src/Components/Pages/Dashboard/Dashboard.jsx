import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet/>
            </main>
        </>
    )
}
