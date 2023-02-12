import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import appSlice from './features/appSlice'
import dictionarySlice from './features/dictionarySlice'
import userSlice from './features/userSlice'
import wordSlice from './features/wordSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        app: appSlice,
        dictionary: dictionarySlice,
        word: wordSlice,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
