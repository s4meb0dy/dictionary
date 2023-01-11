import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserAPI from '../../api/userApi'
import {
    AuthorizationEnum,
    loginDataType,
    registrationDataType,
} from './../../types/index'

import { loginResponseType, userInfoResponseType } from './../../types/apiTypes'

export const login = createAsyncThunk<
    loginResponseType,
    loginDataType,
    { rejectValue: string }
>('user/login', async (loginData, thunkAPI) => {
    try {
        const response = await UserAPI.login(loginData)

        return response.data
    } catch (error: any) {
        // const errorMessage: string =
        //     error.response.data.message.join('. ') || 'Occurred some error'
        // console.log(errorMessage)
        // return thunkAPI.rejectWithValue(errorMessage)
        
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const registration = createAsyncThunk<
    undefined,
    registrationDataType,
    { rejectValue: string }
>('user/registration', async (registerData, thunkAPI) => {
    try {
        const response = await UserAPI.registration(registerData)

        // console.log(response)
        // return { username, email }
        return
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const fetchUserInfo = createAsyncThunk<
    userInfoResponseType,
    undefined,
    { rejectValue: string }
>('user/fetchUserInfo', async (_, thunkAPI) => {
    try {
        const response = await UserAPI.fetchUserInfo()

        return response.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
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
}

const initialState: initialStateType = {
    id: null,
    username: null,
    email: null,
    createdAt: null,
    error: null,
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
                state.error = null
                state.isLoading = true
            })
            .addCase(registration.fulfilled, (state) => {
                state.username = null
                state.email = null
                state.createdAt = null
                state.id = null
                state.authorizationStatus = AuthorizationEnum.Logout
                state.isLoading = false
            })
            .addCase(registration.rejected, (state) => {
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
                    state.authorizationStatus = AuthorizationEnum.Login
                    state.isLoading = false
                }
            )
            .addCase(login.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.authorizationStatus = AuthorizationEnum.Logout
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
