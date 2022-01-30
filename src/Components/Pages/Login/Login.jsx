import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import { SetCookies } from '../../Cookies'
import './Login.css'

const apiUrl = process.env.REACT_APP_API

export const Login = () => {
    const images = ['https://eieihome.com/articles/wp-content/uploads/2017/04/28646787_l.jpg', 'https://rdcnewscdn.realtor.com/wp-content/uploads/2015/08/house-painter.jpg','https://plomerospereira.co/wp-content/uploads/2020/02/plomeros-24-horas-.jpg']
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('https://eieihome.com/articles/wp-content/uploads/2017/04/28646787_l.jpg')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const Login = async (e) => {
        e.preventDefault()
        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const resjson = await response.json()
        if (resjson.message.value) {
            SetCookies(resjson);
            navigate('/')
        }

        setMessage('Correo o contraseña incorrectos')
        setPassword('')
    }
 
    const Image = () => {
        const ramdomNumber = Math.round(Math.random() * 2 )
        return images[ramdomNumber]
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setImage(Image())
        }, 4000);
        return () => clearInterval(interval);
      }, []);

    return (
        <main>
            <div className="center_login">
                <div className='banner_login'>
                    <img className='image_banner_login' src={image} alt='' />
                </div>
                <div className='form_login'>
                    <h1 className='title_login'>Inicia sesión</h1>
                    <form className='form' onSubmit={Login}>
                        <Input funct={setEmail} type='email' placeholder='Correo' value={email} />
                        <Input funct={setPassword} type='password' placeholder='Contraseña' value={password} />
                        <Button value='Iniciar sesión' />
                    </form>
                    <p className='message'>{message}</p>
                    <Link className='link' to='/password/recover'>¿Has olvidado tu contraseña?</Link>
                </div>
            </div>
        </main>
    )
}
