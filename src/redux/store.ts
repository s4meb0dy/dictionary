import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import appSlice from './features/appSlice'
import dictionarySlice from './features/dictionarySlice'
import userSlice from './features/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        app: appSlice,
        dictionary: dictionarySlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
