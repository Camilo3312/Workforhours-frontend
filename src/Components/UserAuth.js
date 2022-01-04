import Cookies from 'universal-cookie'
import sha256 from 'js-sha256'
const cookies = new Cookies()

export const UserAuth = () => {
    const token = cookies.get(sha256('token'))
    if(token) {
        return true
    } else {
        return false
    }
}
