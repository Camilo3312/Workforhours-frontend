import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
const apiUrl = process.env.REACT_APP_API

export const RecoverPassword = () => {

    const [email, setEmail] = useState('')

    const sendEmail = async (e) => {
        e.preventDefault()
        const response = await fetch(`${apiUrl}email/${email}`)
        const resjson = await response.json()
        console.log(resjson);
    }

    return (
        <main>
            <form onSubmit={sendEmail}>
                <Input funct={setEmail} />
                <Button value='Enviar correo' />
            </form>
        </main>
    )
}
