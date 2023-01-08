import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import appSlice from './features/appSlice'
import userSlice from './features/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        app: appSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
