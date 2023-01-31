import { AppDispatch, RootState } from './../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    getMyDictionariesType,
    getDictionariesType,
    createDictionaryType,
} from '../../types/apiTypes'
import DictionaryAPI from '../../api/dictionaryApi'
import { openInfoBlock } from './appSlice'
import { errorHandling } from '../services'

export const fetchDictionaries = createAsyncThunk<
    getMyDictionariesType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchDictionaries', async (_, thunkAPI) => {
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

export const fetchDictionariesByOtherUsers = createAsyncThunk<
    getDictionariesType,
    undefined,
    { rejectValue: string; dispatch: AppDispatch; state: RootState }
>('user/fetchDictionariesByOtherUsers', async (_, thunkAPI) => {
    try {
        const page = thunkAPI.getState().dictionary.dictionaries.page
        const pages = thunkAPI.getState().dictionary.dictionaries.pages
        const limit = thunkAPI.getState().dictionary.dictionaries.limit

        if (pages === page - 1)
            return thunkAPI.rejectWithValue('All pages are loaded')

        const response = await DictionaryAPI.fetchPublicDictionaries(
            page,
            limit
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

export const createDictionary = createAsyncThunk<
    createDictionaryType,
    {
        dictionaryName: string
        isPublic: boolean
        words: Array<{ name: string; translation: string }>
    },
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
        myDictionaries: Array<{
            id: number
            name: string
            createdAt: string
            isPublic: boolean
            learned: number
            total: number
            updatedAt: string
        }>
    }
    dictionaries: {
        limit: number
        page: number
        pages: number | null
        count: number | null
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
        myDictionaries: [],
    },
    isLoading: false,
    dictionaries: {
        limit: 10,
        page: 1,
        pages: null,
        count: null,
        dictionaries: [],
    },
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDictionaries.pending, (state) => {
                if (state.myDictionaries.myDictionaries.length === 0)
                    state.isLoading = true
            })
            .addCase(
                fetchDictionaries.fulfilled,
                (state, action: PayloadAction<getMyDictionariesType>) => {
                    let totalWords = 0
                    let totalLearnedWords = 0

                    action.payload.forEach((item) => {
                        totalWords += item.total
                        totalLearnedWords += item.learned
                    })
                    state.myDictionaries.myDictionaries = action.payload
                    state.myDictionaries.totalLearnedWords = totalLearnedWords
                    state.myDictionaries.totalWords = totalWords
                    state.myDictionaries.totalDictionaries =
                        action.payload.length

                    state.isLoading = false
                }
            )
            .addCase(fetchDictionaries.rejected, (state, action) => {
                state.isLoading = false
            })
            //--------------------------
            .addCase(fetchDictionariesByOtherUsers.pending, (state) => {
                if (state.dictionaries.dictionaries.length === 0)
                    state.isLoading = true
            })
            .addCase(
                fetchDictionariesByOtherUsers.fulfilled,
                (state, action: PayloadAction<getDictionariesType>) => {
                    if (action.payload.pages >= action.payload.page)
                        state.dictionaries.page = action.payload.page + 1
                    else state.dictionaries.page = action.payload.page

                    state.dictionaries.dictionaries.push(
                        ...action.payload.dictionaries
                    )
                    state.dictionaries.limit = action.payload.limit
                    state.dictionaries.count = action.payload.count
                    state.dictionaries.pages = action.payload.pages

                    state.isLoading = false
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
            .addCase(
                createDictionary.fulfilled,
                (state, action: PayloadAction<createDictionaryType>) => {
                    
                    state.myDictionaries.myDictionaries.unshift({
                        id: action.payload.id,
                        name: action.payload.name,
                        createdAt: action.payload.createdAt,
                        isPublic: action.payload.isPublic,
                        learned: 0,
                        total: 0,
                        updatedAt: action.payload.updatedAt,
                    })
                    // state.myDictionaries.totalWords += action.payload.length
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
