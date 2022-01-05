import React, { useState, useEffect } from 'react'
import { Button } from '../../IU/Button/Button'
import { Input } from '../../IU/Input/Input'
import { Select } from '../../IU/Select/Select'
import { getToken, getUserInfo } from '../../Cookies'
import Axios from 'axios'
const apiUrl = process.env.REACT_APP_API

export const AddService = () => {
    const user = getUserInfo()
    
    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [imageservice, setImageservice] = useState('')

    const getCities = async () => {
        const response = await fetch(`${apiUrl}api/location`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        }).catch(() => {
            console.log('Error to fetch cities');
        })

        const resjson = await response.json();
        setCities(resjson);
    }

    const UploadImage = async (files) => {
        const formData = new FormData()
        formData.append('upload_preset', 'kd1kvjbg')
        formData.append('file', files.target.files[0])
        const responseImage = await Axios.post('https://api.cloudinary.com/v1_1/sena-quindio/image/upload', formData)
        setImageservice(responseImage)
    }

    const getCategories = async () => {
        const response = await fetch(`${apiUrl}api/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            }
        }).catch(() => {
            console.log('Error to fetch categories');
        })
        const resjson = await response.json();
        setCategories(resjson);
    }

    const registerService = async (e) => {
        e.preventDefault()
        const response = await fetch(`${apiUrl}services/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `BEARER ${getToken()}`
            },
            body: JSON.stringify({
                iduser: user.idduser,
                name: name,
                location: location,
                description: description,
                price: price,
                category: category,
                imageservice: imageservice
            })
        })
        const resjson = await response.json()
        if (resjson.value) {
            alert("Servicio registrado exitosamente")
        } else {
            alert("Error al insertar el servicio")
        }
    }

    useEffect(() => {
        getCities()
        getCategories()
    }, [])

    return (
        <main>
            <p>Add service</p>
            <form onSubmit={registerService}>
                <Input funct={setName} placeholder='Nombre del servicio' />
                <Select funct={setLocation}>
                    <option>Seleccione una ciudad</option>
                    {
                        cities?.map(item => (
                            <option value={item.idcitie}>{item.name}</option>
                        ))
                    }
                </Select>
                <Input funct={setDescription} placeholder='Describa el servicio a ofrecer' />
                <Input funct={setPrice} type='number' />
                <Select funct={setCategory}>
                    <option>Seleccione una categoria</option>
                    {
                        categories?.map(item => (
                            <option value={item.idcategory}>{item.name}</option>
                        ))
                    }
                </Select>
                <input type="file" onChange={e => UploadImage(e)} />
                <Button value='Registrar producto' />
            </form>
        </main>
    )
}