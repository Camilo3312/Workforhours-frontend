import React from 'react'
import { InfoService } from './Components/Pages/InfoService/InfoService'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddService } from './Components/Pages/AddService/AddService'
import { Home } from './Components/Pages/Home/Home'
import { Login } from './Components/Pages/Login/Login'
import { RecoverPassword } from './Components/Pages/RecoverPassword/RecoverPassword'
import { UpdatePassword } from './Components/Pages/UpdatePassword/UpdatePassword'
import { Profile } from './Components/Pages/Profile/Profile'
import { Register } from './Components/Pages/Register/Register'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Chat } from './Components/Pages/Chat/Chat'
import { Dashboard } from './Components/Pages/Dashboard/Dashboard'
import { Services } from './Components/Layout/Services/Services'
import { Header } from './Components/Layout/Header/Header'

function App() {
    
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/*' element={<Home />} />
                    <Route path='service/:name/:id' element={
                        <ProtectedRoute route='/login'>
                            <InfoService />
                        </ProtectedRoute>} />
                    <Route path='/service/add' element={<ProtectedRoute route='/login'><AddService /></ProtectedRoute>} />
                    <Route path='/profile/user/:id' element={<ProtectedRoute route='/login'><Profile /></ProtectedRoute>} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/dashboard/*' element={<Dashboard />}>
                        <Route path='services' element={<Services />} />
                        <Route path='services/add' element={<AddService />} />
                    </Route>                              
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/password/recover' element={<RecoverPassword />} />
                    <Route path='/password/update/:token/:email' element={<UpdatePassword />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;