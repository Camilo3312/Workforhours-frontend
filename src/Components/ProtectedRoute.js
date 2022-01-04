import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './UserAuth'

export const ProtectedRoute = ({children, route}) => {
    return (
        UserAuth() ? children : <Navigate to={route}/>
    )
}