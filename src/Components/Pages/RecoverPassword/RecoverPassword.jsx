import React, { useState } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import { ReactComponent as Email } from '../../../Assets/Icons/Email.svg'
import './RecoverPassword.css'
const apiUrl = process.env.REACT_APP_API

export const RecoverPassword = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [sendEmailState, setSendEmail] = useState(false)

    const sendEmail = async (e) => {
        e.preventDefault()
        if (email) {
            setSendEmail(true)
            const response = await fetch(`${apiUrl}email/${email}`)
        }
        else {
            setMessage('Porfavor complete el campo')
        }

    }

    return (
        <main>
            <div className="center_main_send_email">
                <section className='info_send_email'>
                    <h1 className='title_send_email'>Restablesca la contraseña</h1>
                    <Email className='icon_email' />
                    <p className='paragraph_send_email'>Ingresa la direccion de correo, a continuacion le enviaremos el correo que permitira restablecerla</p>
                </section>
                {
                    !sendEmailState ?
                        <>
                            <form className='form_send_email' onSubmit={sendEmail}>
                                <Input funct={setEmail} placeholder='Ejemplo: Carlos@gmail.com' />
                                <Button value='Restablecer' />
                            </form>
                            <p>{message}</p>

                        </>
                        :

                        <div>
                            <p>El correo a sido eviado por favor verifique su correo <a>{email}</a> </p>
                        </div>

                }
            </div>
        </main>
    )
}
