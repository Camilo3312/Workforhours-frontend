import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import { Link, useParams } from 'react-router-dom'
import './UpdatePassword.css'
const apiUrl = process.env.REACT_APP_API

export const UpdatePassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)
    const params = useParams()

    const updatePassword = async (e) => {
        e.preventDefault()
        if (password != '' && confirmPassword != '' && password === confirmPassword) {

            const response = await fetch(`${apiUrl}password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `BEARER ${params.token}`
                },
                body: JSON.stringify({
                    emailuser: params.email,
                    password: password
                })
            })
            const resjson = await response.json()
            if (resjson.value) {
                setIsUpdate(true)
            }
            else {
                setMessage('A ocurrido un error, intente reenviando un nuevo correo de recuperación')
            }
        }
        else {
            setMessage('Las contraseñas no coinciden')
        }
    }

    return (
        <main>
            <div className="center_main">
                {!isUpdate ?
                    <form className='form_update_password' onSubmit={updatePassword}>
                        <h1>Nueva contraseña</h1>
                        <Input funct={setPassword} placeholder='Nueva contraseña' type='password' />
                        <Input funct={setConfirmPassword} placeholder='Confirmar nueva contraseña' type='password' />
                        <p>{message}</p>
                        <Button value='Guardar' />
                    </form>
                    :
                    <div className='flex_is_update'>
                        <h1>Contraseña actualizada</h1>
                        <Link to='/login'>ingresar</Link>
                    </div>
                }
            </div>
        </main>
    )
}
