import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import { useParams } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API

export const UpdatePassword = () => {

    const [password, setPassword] = useState('')
    const params = useParams()

    const updatePassword = async (e) => {
        e.preventDefault()
        const response = await fetch(`${apiUrl}password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `BEARER ${params.token}`
            },
            body: JSON.stringify({
                emailuser: params.email,
                password: password
            })
        })
        const resjson = await response.json()
        console.log(resjson);
    }

    return (
        <main>
            <form onSubmit={updatePassword}>
                <Input funct={setPassword} />
                <Button value='Guardar' />
            </form>
        </main>
    )
}
