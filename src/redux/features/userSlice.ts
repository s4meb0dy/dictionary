import { AppDispatch } from './../store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserAPI from '../../api/userApi'
import {
    AuthorizationEnum,
    loginDataType,
    registrationDataType,
} from './../../types/index'

import { loginResponseType, userInfoResponseType } from './../../types/apiTypes'
import { openInfoBlock } from './appSlice'

export const login = createAsyncThunk<
    loginResponseType,
    loginDataType,
    { rejectValue: string; dispatch: AppDispatch }
>('user/login', async (loginData, thunkAPI) => {
    try {
        const response = await UserAPI.login(loginData)
        thunkAPI.dispatch(
            openInfoBlock({
                type: 'success',
                title: 'Success',
                text: 'You are logged in',
            })
        )
        return response.data
    } catch (error: any) {
        const errorMessage: Array<string> = error.response
            ? error.response.data.message
            : error.message

        if (Array.isArray(errorMessage)) {
            thunkAPI.dispatch(
                openInfoBlock({
                    title: 'Error',
                    text: errorMessage.join(' | '),
                    type: 'error',
                })
            )
            return thunkAPI.rejectWithValue(errorMessage.join(' | '))
        }
        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Error',
                text: errorMessage,
                type: 'error',
            })
        )
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const registration = createAsyncThunk<
    loginResponseType,
    registrationDataType,
    { rejectValue: string; dispatch: AppDispatch }
>('user/registration', async (registerData, thunkAPI) => {
    try {
        const response = await UserAPI.registration(registerData)

        thunkAPI.dispatch(
            openInfoBlock({
                type: 'success',
                title: 'Success',
                text: 'You are registered',
            })
        )

        return response.data
    } catch (error: any) {
        const errorMessage: Array<string> = error.response
            ? error.response.data.message
            : error.message

        if (Array.isArray(errorMessage)) {
            thunkAPI.dispatch(
                openInfoBlock({
                    title: 'Error',
                    text: errorMessage.join(' | '),
                    type: 'error',
                })
            )
            return thunkAPI.rejectWithValue(errorMessage.join(' | '))
        }
        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Error',
                text: errorMessage,
                type: 'error',
            })
        )
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const fetchUserInfo = createAsyncThunk<
    userInfoResponseType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchUserInfo', async (_, thunkAPI) => {
    try {
        const response = await UserAPI.fetchUserInfo()

        return response.data
    } catch (error: any) {
        const errorMessage: Array<string> = error.response
            ? error.response.data.message
            : error.message

        if (Array.isArray(errorMessage)) {
            thunkAPI.dispatch(
                openInfoBlock({
                    title: 'Error',
                    text: errorMessage.join(' | '),
                    type: 'error',
                })
            )
            return thunkAPI.rejectWithValue(errorMessage.join(' | '))
        }
        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Error',
                text: errorMessage,
                type: 'error',
            })
        )
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

type initialStateType = {
    id: number | null
    username: string | null
    createdAt: string | null
    email: string | null
    error: string | null
    authorizationStatus: AuthorizationEnum
    isLoading: boolean
    isConfirmed: boolean | null
}

const initialState: initialStateType = {
    id: null,
    username: null,
    email: null,
    createdAt: null,
    error: null,
    isConfirmed: null,
    authorizationStatus: AuthorizationEnum.Unknown,
    isLoading: false,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //---REGISTRATION
        builder
            .addCase(registration.pending, (state) => {
                localStorage.removeItem('token')
                state.error = null
                state.isLoading = true
            })
            .addCase(
                registration.fulfilled,
                (state, action: PayloadAction<loginResponseType>) => {
                    localStorage.setItem('token', action.payload.access_token)
                    state.username = action.payload.username
                    state.email = action.payload.email
                    state.createdAt = action.payload.createdAt
                    state.id = action.payload.id
                    state.authorizationStatus = AuthorizationEnum.Login
                    state.isLoading = false
                }
            )
            .addCase(registration.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.username = null
                state.email = null
                state.createdAt = null
                state.id = null
                state.authorizationStatus = AuthorizationEnum.Logout
                state.isLoading = false
            })

            //---LOGIN
            .addCase(login.pending, (state) => {
                localStorage.removeItem('token')
                state.error = null
                state.isLoading = true
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<loginResponseType>) => {
                    localStorage.setItem('token', action.payload.access_token)
                    state.username = action.payload.username
                    state.email = action.payload.email
                    state.createdAt = action.payload.createdAt
                    state.id = action.payload.id
                    state.isConfirmed = action.payload.isConfirmed
                    state.authorizationStatus = AuthorizationEnum.Login
                    state.isLoading = false
                }
            )
            .addCase(login.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.authorizationStatus = AuthorizationEnum.Logout
                state.username = null
                state.email = null
                state.createdAt = null
                state.id = null
                state.isLoading = false
                state.isLoading = false
            })

            //---FETCH USER INFO
            .addCase(fetchUserInfo.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(
                fetchUserInfo.fulfilled,
                (state, action: PayloadAction<userInfoResponseType>) => {
                    // localStorage.setItem('token', action.payload.access_token)
                    state.username = action.payload.username
                    state.email = action.payload.email
                    state.createdAt = action.payload.createdAt
                    state.id = action.payload.id
                    state.authorizationStatus = AuthorizationEnum.Login
                    state.isLoading = false
                }
            )
            .addCase(fetchUserInfo.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                localStorage.removeItem('token')
                state.authorizationStatus = AuthorizationEnum.Logout
                state.isLoading = false
            })
    },
})

// export const {} = userSlice.actions

export default userSlice.reducer
