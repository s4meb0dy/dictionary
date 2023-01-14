import { loginResponseType, userInfoResponseType } from './../types/apiTypes';
import { instance } from './index'
import { loginDataType, registrationDataType } from './../types/index'
export const a = 1

class UserAPI {
    static registration = (values: registrationDataType) => {
        return instance.post<loginResponseType>('/auth/signup', values)
    }
    static login = (values: loginDataType) => {
        return instance.post<loginResponseType>('/auth/login', values)
    }
    static fetchUserInfo = () => {
        return instance.get<userInfoResponseType>('/user/userinfo', {withCredentials: true})
    }
}

export default UserAPI
