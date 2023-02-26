import { userApi } from './services/userApi'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import appSlice from './features/appSlice'
import dictionarySlice from './features/dictionarySlice'
import userSlice from './features/userSlice'
import wordSlice from './features/wordSlice'
import { dictionaryApi } from './services/dictionaryApi'

const store = configureStore({
    reducer: {
        [dictionaryApi.reducerPath]: dictionaryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userSlice,
        app: appSlice,
        dictionary: dictionarySlice,
        word: wordSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            dictionaryApi.middleware,
            userApi.middleware,
        ]),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
