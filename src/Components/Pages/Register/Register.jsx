import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import './Register.css'
const urlApi = process.env.REACT_APP_API

export const Register = () => {

    const [surnames, setSurnames] = useState('')
    const [names, setNames] = useState('')
    const [fecnac, setFecnac] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = async (e) => {
        e.preventDefault()
        const response = await fetch(`${urlApi}users/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            body: JSON.stringify({
                surnames: surnames,
                names: names,
                fecnac: fecnac,
                email: email,
                password: password,
                imageprofile: "https://res.cloudinary.com/sena-quindio/image/upload/v1643318160/huxqpdulldadg9ceb4jb.png"
            })
        })
        const resjson = await response.json()
        if(resjson.value) {
            alert("Usuario registrado exitosamente")
        } else {
            alert("Error al insertar el usuario")
        }
    }

    return (
        <main className='main_register'>
            <div className="center_main_register">
                <h1 className='subtitle_register'>Registro</h1>
                <form className='form_register' onSubmit={register}>
                    <p className='subtitle_form_register'>Informacion personal</p>
                    <Input funct={setSurnames} type='text' placeholder='Apellidos'/>
                    <Input funct={setNames} type='text' placeholder='Nombres'/>
                    <Input funct={setFecnac} type='date'/>

                    <p className='subtitle_form_register'>Informacion de cuenta</p>
                    <Input funct={setEmail} type='email' placeholder='Correo'/>
                    <Input funct={setPassword} type='password' placeholder='Contraseña'/>
                    <Button value='Registar'/>
                </form>
            </div>
        </main>
    )
}
