import { createSlice } from "@reduxjs/toolkit"

type initialStateType = {
    id: number | null
    username: string | null
    email: string | null
}

const initialState: initialStateType = {
    id: null,
    username: null,
    email: null,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
})

// export const {} = userSlice.actions

export default userSlice.reducer
