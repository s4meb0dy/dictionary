import { AppDispatch } from './../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getDictionaryType } from '../../types/apiTypes'
import DictionaryAPI from '../../api/dictionaryApi'
import { openInfoBlock } from './appSlice'

export const fetchDictionaries = createAsyncThunk<
    getDictionaryType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchUserInfo', async (_, thunkAPI) => {
    try {
        const response = await DictionaryAPI.fetchUserInfo()

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
    dictionaries: Array<{
        id: number
        name: string
        createdAt: string
        isPublic: boolean
        words: Array<string>
        learned: number
        total: number
    }>
    isLoading: boolean
}

const initialState: initialStateType = {
    dictionaries: [],
    isLoading: false,
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //---REGISTRATION
        builder
            .addCase(fetchDictionaries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchDictionaries.fulfilled,
                (state, action: PayloadAction<getDictionaryType>) => {
                    state.dictionaries = action.payload
                    state.isLoading = false
                }
            )
            .addCase(fetchDictionaries.rejected, (state, action) => {
                state.isLoading = false
            })
    },
})

export default dictionarySlice.reducer
