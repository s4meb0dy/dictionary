import { AppDispatch } from './../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    getMyDictionariesType,
    getDictionariesType,
} from '../../types/apiTypes'
import DictionaryAPI from '../../api/dictionaryApi'
import { openInfoBlock } from './appSlice'

export const fetchDictionaries = createAsyncThunk<
    getMyDictionariesType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchDictionaries', async (_, thunkAPI) => {
    try {
        
        const response = await DictionaryAPI.fetchMyDictionaries()

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

export const fetchDictionariesByOtherUsers = createAsyncThunk<
    getDictionariesType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchDictionariesByOtherUsers', async (_, thunkAPI) => {
    try {

        const response = await DictionaryAPI.fetchPublicDictionaries()

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

export const createDictionary = createAsyncThunk<
    undefined,
    {
        dictionaryName: string
        isPublic: boolean
        words: Array<{ name: string; translation: string }>
    },
    { rejectValue: string; dispatch: AppDispatch }
>('user/createDictionary', async (data, thunkAPI) => {
    try {
        const response = await DictionaryAPI.postDictionary(data)

        thunkAPI.dispatch(
            openInfoBlock({ title: 'Success', type: 'success', text: 'Dictionary added' })
        )
        console.log(response.data)
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
    myDictionaries: Array<{
        id: number
        name: string
        createdAt: string
        isPublic: boolean
        words: Array<{
            id: number
            name: string
            translation: string
            isLearned: boolean
            createdAt: string
        }>
        learned: number
        total: number
    }>
    dictionaries: Array<{
        id: number
        createdAt: string
        isPublic: boolean
        name: string
        words: [
            {
                id: number
                name: string
                translation: string
                isLearned: boolean
                createdAt: string
            }
        ]
    }>
    isLoading: boolean
}

const initialState: initialStateType = {
    myDictionaries: [],
    isLoading: false,
    dictionaries: [],
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDictionaries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchDictionaries.fulfilled,
                (state, action: PayloadAction<getMyDictionariesType>) => {
                    state.myDictionaries = action.payload
                    state.isLoading = false
                }
            )
            .addCase(fetchDictionaries.rejected, (state, action) => {
                state.isLoading = false
            })
            //--------------------------
            .addCase(fetchDictionariesByOtherUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchDictionariesByOtherUsers.fulfilled,
                (state, action: PayloadAction<getDictionariesType>) => {
                    state.dictionaries = action.payload
                }
            )
            .addCase(
                fetchDictionariesByOtherUsers.rejected,
                (state, action) => {
                    state.isLoading = false
                }
            )
            //--------------------------
            .addCase(createDictionary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDictionary.fulfilled, (state) => {
                // state.dictionaries = action.payload
            })
            .addCase(createDictionary.rejected, (state, action) => {
                state.isLoading = false
            })
    },
})

export default dictionarySlice.reducer
