import { transformErrorFromApi } from '../../utils/transforErrorFromApi'
import { IError } from './../../types/models/IError'
import {
    ILoginUserRequest,
    IRegistrationUserRequest,
    IUser,
} from './../../types/models'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from './api'

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],

    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers) => {
            if (localStorage.getItem('token')) {
                headers.set(
                    'authorization',
                    `Bearer ${localStorage.getItem('token')}`
                )
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<IUser, ILoginUserRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        registration: builder.mutation<IUser, IRegistrationUserRequest>({
            query: (body) => ({
                url: 'auth/signup',
                method: 'POST',
                body,
            }),
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        getUserInfo: builder.query<IUser, void>({
            query: () => ({
                url: 'user/status',
            }),
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
    }),
})
