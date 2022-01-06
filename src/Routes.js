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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='service/:name/:id' element={
          <ProtectedRoute route='/login'>         
            <InfoService/>
          </ProtectedRoute>}/>          
        <Route path='/login' element={<Login/>}/>
        <Route path='/service/add' element={<ProtectedRoute route='/login'><AddService/></ProtectedRoute>}/>
        <Route path='/profile/user/:id' element={<ProtectedRoute route='/login'><Profile/></ProtectedRoute>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password/recover' element={<RecoverPassword/>}/>
        <Route path='/password/update/:token/:email' element={<UpdatePassword/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}>
          <Route path='services' element={<AddService/>}/>   
          <Route path='services/add' element={<AddService/>}/>   
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App;