import { instance } from './index'
import {
    infoUserResponseType,
    loginUserResponseType,
    registerUserResponseType,
    registerUserRequestType,
    loginUserRequestType,
} from '../types/apiTypes/userAPITypes'

export const a = 1

class UserAPI {
    static registration = (values: registerUserRequestType) => {
        return instance.post<registerUserResponseType>('/auth/signup', values)
    }
    static login = (values: loginUserRequestType) => {
        return instance.post<loginUserResponseType>('/auth/login', values)
    }
    static fetchUserInfo = () => {
        return instance.get<infoUserResponseType>('/user/userinfo', {
            withCredentials: true,
        })
    }
}

export default UserAPI
