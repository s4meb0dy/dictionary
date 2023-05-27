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
            headers.set(
                "ngrok-skip-browser-warning",
                "true"
            );
            if (localStorage.getItem('token')) {
                headers.set(
                    'Authorization',
                    `Bearer ${localStorage.getItem('token')}`
                )
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<IUser, ILoginUserRequest>({
            query: (body) => ({
                url: '/user/login',
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
                if (response?.data?.error)
                    return transformErrorFromApi(response.data.error)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        registration: builder.mutation<IUser, IRegistrationUserRequest>({
            query: (body) => ({
                url: 'user/signup',
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
                if (response?.data?.error)
                    return transformErrorFromApi(response.data.error)
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
                if (response?.data?.error)
                    return transformErrorFromApi(response.data.error)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
    }),
})
