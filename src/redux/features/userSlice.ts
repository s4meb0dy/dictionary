import { userApi } from './../services/userApi'
import { AppDispatch } from './../store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthorizationEnum } from './../../types/index'
import { IError } from '../../types/models'

type initialStateType = {
    authorizationStatus: AuthorizationEnum
}

const initialState: initialStateType = {
    authorizationStatus: AuthorizationEnum.Unknown,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.registration.matchPending,
                (state, action) => {
                    localStorage.removeItem('token')
                    state.authorizationStatus = AuthorizationEnum.Logout
                }
            )
            .addMatcher(
                userApi.endpoints.registration.matchFulfilled,
                (state, action) => {
                    if (action.payload.access_token) {
                        localStorage.setItem(
                            'token',
                            action.payload.access_token
                        )
                        state.authorizationStatus = AuthorizationEnum.Login
                    }
                }
            )
            .addMatcher(
                userApi.endpoints.login.matchPending,
                (state, action) => {
                    localStorage.removeItem('token')
                    state.authorizationStatus = AuthorizationEnum.Logout
                }
            )
            .addMatcher(
                userApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    if (action.payload.access_token) {
                        localStorage.setItem(
                            'token',
                            action.payload.access_token
                        )
                        state.authorizationStatus = AuthorizationEnum.Login
                    }
                }
            )
            .addMatcher(
                userApi.endpoints.getUserInfo.matchFulfilled,
                (state, action) => {
                    state.authorizationStatus = AuthorizationEnum.Login
                }
            )
            .addMatcher(
                userApi.endpoints.getUserInfo.matchRejected,
                (state, action) => {
                    state.authorizationStatus = AuthorizationEnum.Logout
                }
            )
    },
})

// export const {} = userSlice.actions

export default userSlice.reducer
