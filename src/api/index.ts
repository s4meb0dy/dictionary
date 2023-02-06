import axios from 'axios'

export const instance = axios.create({
    // baseURL: `${process.env.REACT_APP_SERVER_HOST}/api`,
    // baseURL: `http://localhost:3001/api`,
    baseURL: `https://dictionary-api-production-bbb6.up.railway.app/api/`,
})

instance.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})