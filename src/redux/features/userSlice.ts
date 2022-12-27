import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
    AuthorizationEnum,
    registrationDataType,
    userType,
} from "./../../types/index"

const login = createAsyncThunk("login", async () => {})

const registration = createAsyncThunk<userType, registrationDataType, {}>(
    "registration",
    async () => {
        const username = '11'
        const email = '11'
        const password = '11'

        return {username, email}
    }
)

type initialStateType = {
    id: number | null
    username: string | null
    email: string | null
    authorizationStatus: AuthorizationEnum
}

const initialState: initialStateType = {
    id: null,
    username: null,
    email: null,
    authorizationStatus: AuthorizationEnum.Unknown,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
})

// export const {} = userSlice.actions

export default userSlice.reducer
