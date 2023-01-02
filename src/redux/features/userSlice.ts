import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserAPI from '../../api/userApi'
import {
    AuthorizationEnum,
    loginDataType,
    registrationDataType,
    userType,
} from './../../types/index'

export const login = createAsyncThunk<
    { accessToken: string },
    loginDataType,
    { rejectValue: string }
>('user/login', async (loginData, thunkAPI) => {
    try {
        // const username = "11"
        // const email = "11"
        const accessToken = ''

        const response = await UserAPI.login(loginData)

        // if(response.status )
        console.log(response)

        return { accessToken: '' }
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue('Occurred some error')
    }
})

export const registration = createAsyncThunk<
    undefined,
    registrationDataType,
    { rejectValue: string }
>('user/registration', async ({ username, email, password }, thunkAPI) => {
    try {
        const username = '11'
        const email = '11'

        // return { username, email }
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue('Occurred some error')
    }
})

type initialStateType = {
    id: number | null
    username: string | null
    email: string | null
    authorizationStatus: AuthorizationEnum
    isLoading: boolean
}

const initialState: initialStateType = {
    id: null,
    username: null,
    email: null,
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
                state.isLoading = true
            })
            .addCase(registration.fulfilled, (state) => {
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
                state.isLoading = true
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<{ accessToken: string }>) => {
                    localStorage.setItem('token', action.payload.accessToken)
                    state.authorizationStatus = AuthorizationEnum.Login
                    state.isLoading = false
                }
            )
            .addCase(login.rejected, (state) => {
                state.authorizationStatus = AuthorizationEnum.Logout
                state.isLoading = false
            })
    },
})

// export const {} = userSlice.actions

export default userSlice.reducer
