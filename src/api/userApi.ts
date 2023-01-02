import { instance } from './index'
import { loginDataType, registrationDataType } from './../types/index'
export const a = 1

class UserAPI {
    static registration = (values: registrationDataType) => {
        return instance.post<registrationDataType>('/auth/signup', values)
    }
    static login = (values: loginDataType) => {
        return instance.post<{ access_token: string }>('/auth/login', values)
    }
}

export default UserAPI
