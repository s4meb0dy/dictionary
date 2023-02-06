import {
    getMyDictionariesResponseType,
    getAllPublicDictionariesResponseType,
    createDictionaryResponseType,
    createDictionaryRequestType,
} from './../../types/apiTypes/dictionaryAPITypes'
import { AppDispatch, RootState } from './../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import DictionaryAPI from '../../api/dictionaryApi'
import { openInfoBlock } from './appSlice'
import { errorHandling } from '../services'

export const fetchMyDictionaries = createAsyncThunk<
    getMyDictionariesResponseType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchMyDictionaries', async (_, thunkAPI) => {
    try {
        const response = await DictionaryAPI.fetchMyDictionaries()

        return response.data
    } catch (error: any) {
        const errorMessage = errorHandling(error)

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

export const fetchAllPublicDictionaries = createAsyncThunk<
    getAllPublicDictionariesResponseType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch; state: RootState }
>('user/fetchAllPublicDictionaries', async (_, thunkAPI) => {
    try {
        const page = thunkAPI.getState().dictionary.allPublicDictionaries.page
        const pages = thunkAPI.getState().dictionary.allPublicDictionaries.pages
        const limit = thunkAPI.getState().dictionary.allPublicDictionaries.limit

        if (pages && pages < page)
            return thunkAPI.rejectWithValue('All pages are loaded')

        const response = await DictionaryAPI.fetchPublicDictionaries({
            page,
            limit,
        })

        return response.data
    } catch (error: any) {
        const errorMessage = errorHandling(error)

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
    createDictionaryResponseType,
    createDictionaryRequestType,
    { rejectValue: string; dispatch: AppDispatch }
>('user/createDictionary', async (data, thunkAPI) => {
    try {
        const response = await DictionaryAPI.createDictionary(data)

        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Success',
                type: 'success',
                text: 'Dictionary added',
            })
        )

        return response.data
    } catch (error: any) {
        const errorMessage = errorHandling(error)

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
    myDictionaries: {
        totalWords: number
        totalDictionaries: number
        totalLearnedWords: number
        error: string | null
        dictionaries: Array<{
            id: number
            name: string
            createdAt: string
            isPublic: boolean
            learned: number
            total: number
            updatedAt: string
        }>
    }
    allPublicDictionaries: {
        limit: number
        page: number
        pages: number | null
        count: number | null
        error: string | null
        dictionaries: Array<{
            id: number
            createdAt: string
            learned: number
            updatedAt: string
            isPublic: boolean
            name: string
            total: number
        }>
    }
    isLoading: boolean
}

const initialState: initialStateType = {
    myDictionaries: {
        totalWords: 0,
        totalDictionaries: 0,
        totalLearnedWords: 0,
        dictionaries: [],
        error: null,
    },
    allPublicDictionaries: {
        limit: 10,
        page: 1,
        pages: null,
        count: null,
        dictionaries: [],
        error: null,
    },
    isLoading: false,
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyDictionaries.pending, (state) => {
                if (state.myDictionaries.dictionaries.length === 0)
                    state.isLoading = true
            })
            .addCase(
                fetchMyDictionaries.fulfilled,
                (
                    state,
                    action: PayloadAction<getMyDictionariesResponseType>
                ) => {
                    let totalWords = 0
                    let totalLearnedWords = 0

                    action.payload.forEach((item) => {
                        totalWords += item.total
                        totalLearnedWords += item.learned
                    })
                    state.myDictionaries.dictionaries = action.payload
                    state.myDictionaries.totalLearnedWords = totalLearnedWords
                    state.myDictionaries.totalWords = totalWords
                    state.myDictionaries.totalDictionaries =
                        action.payload.length

                    state.isLoading = false
                }
            )
            .addCase(fetchMyDictionaries.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) state.myDictionaries.error = action.payload
            })
            //--------------------------
            .addCase(fetchAllPublicDictionaries.pending, (state) => {
                if (state.allPublicDictionaries.dictionaries.length === 0)
                    state.isLoading = true
            })
            .addCase(
                fetchAllPublicDictionaries.fulfilled,
                (
                    state,
                    action: PayloadAction<getAllPublicDictionariesResponseType>
                ) => {
                    state.allPublicDictionaries.page = action.payload.page + 1

                    state.allPublicDictionaries.dictionaries.push(
                        ...action.payload.dictionaries
                    )
                    state.allPublicDictionaries.limit = action.payload.limit
                    state.allPublicDictionaries.count = action.payload.count
                    state.allPublicDictionaries.pages = action.payload.pages

                    state.isLoading = false
                }
            )
            .addCase(fetchAllPublicDictionaries.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload)
                    state.allPublicDictionaries.error = action.payload
            })
            //--------------------------
            .addCase(createDictionary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                createDictionary.fulfilled,
                (
                    state,
                    action: PayloadAction<createDictionaryResponseType>
                ) => {
                    state.myDictionaries.dictionaries.unshift({
                        id: action.payload.id,
                        name: action.payload.name,
                        createdAt: action.payload.createdAt,
                        isPublic: action.payload.isPublic,
                        learned: action.payload.learned,
                        total: action.payload.total,
                        updatedAt: action.payload.updatedAt,
                    })
                    state.myDictionaries.totalWords += action.payload.total
                    state.myDictionaries.totalDictionaries += 1

                    state.isLoading = false
                }
            )
            .addCase(createDictionary.rejected, (state, action) => {
                state.isLoading = false
            })
    },
})

export default dictionarySlice.reducer
