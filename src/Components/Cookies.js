import Cookies from 'universal-cookie'
import sha256 from 'js-sha256'
import { UserAuth } from './UserAuth'

const cookies = new Cookies()

export const SetCookies = (object) => {
    const { user } = object
    cookies.set(sha256('user_info'), user[0])
    cookies.set(sha256('token'), user[0].token)
}

export const getToken = () => {
    if(UserAuth())
        return cookies.get(sha256('token'))
}

export const getUserInfo = () => {
    if(UserAuth()) {
        return cookies.get(sha256('user_info'))
    }
    else {
        return null
    }
}

export const removeSessionCookie = () => {
    if(UserAuth())
        cookies.remove(sha256('token'))
        cookies.remove(sha256('user_info'))
}