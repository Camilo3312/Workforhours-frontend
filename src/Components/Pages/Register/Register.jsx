import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
const urlApi = process.env.REACT_APP_API

export const Register = () => {

    const [surnames, setSurnames] = useState('')
    const [names, setNames] = useState('')
    const [fecnac, setFecnac] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')

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
                imageprofile: image
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
        <form onSubmit={register}>
            <Input funct={setSurnames} type='text' placeholder='Apellidos'/>
            <Input funct={setNames} type='text' placeholder='Nombres'/>
            <Input funct={setFecnac} type='date'/>
            <Input funct={setEmail} type='email' placeholder='Correo'/>
            <Input funct={setPassword} type='password' placeholder='Contraseña'/>
            <Input funct={setImage} type='file' />
            <Button value='Registar'/>
        </form>
    )
}
