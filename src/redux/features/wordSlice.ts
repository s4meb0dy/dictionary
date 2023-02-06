import { createWordRequestType } from './../../types/apiTypes/wordAPITypes'
import { RootState } from './../store'
import { AppDispatch } from '../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { openInfoBlock } from './appSlice'
import WordAPI from '../../api/wordApi'
import { errorHandling } from '../services'
import {
    getWordsFromDictionaryResponseType,
    wordType,
} from '../../types/apiTypes/wordAPITypes'

export const fetchWordsFromDictionary = createAsyncThunk<
    getWordsFromDictionaryResponseType,
    number,
    { rejectValue: string; dispatch: AppDispatch; state: RootState }
>('user/fetchWordsByDictionaryId', async (dictionaryId, thunkAPI) => {
    try {
        const page = thunkAPI.getState().word.page
        const pages = thunkAPI.getState().word.pages
        const limit = thunkAPI.getState().word.limit

        if (pages && pages < page)
            return thunkAPI.rejectWithValue('All pages are loaded')

        const response = await WordAPI.fetchWordsFromDictionary({
            dictionaryId,
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

export const updateWord = createAsyncThunk<
    wordType,
    {
        wordId: number
        name: string
        translation: string
    },
    { rejectValue: string; dispatch: AppDispatch }
>('user/updateWord', async (data, thunkAPI) => {
    try {
        const response = await WordAPI.updateWord(data)

        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Success',
                type: 'success',
                text: 'Word updated successfully',
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

export const addWord = createAsyncThunk<
    wordType,
    createWordRequestType,
    { rejectValue: string; dispatch: AppDispatch }
>('user/addWord', async (data, thunkAPI) => {
    try {
        const response = await WordAPI.createWord(data)

        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Success',
                type: 'success',
                text: 'Word added successfully',
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

export const deleteWord = createAsyncThunk<
    { wordId: number; success: boolean },
    number,
    { rejectValue: string; dispatch: AppDispatch }
>('user/deleteWord', async (wordId, thunkAPI) => {
    try {
        const response = await WordAPI.deleteWord({ wordId })

        thunkAPI.dispatch(
            openInfoBlock({
                title: 'Success',
                type: 'success',
                text: 'Word deleted successfully',
            })
        )

        return { wordId, success: response?.data?.success }
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
    count: number
    learned: number | null
    limit: number
    page: number
    pages: number | null
    words: Array<wordType>
    idOfWordsToStudy: Array<number>
    isLoading: boolean
}

const initialState: initialStateType = {
    count: 0,
    learned: null,
    limit: 10,
    page: 1,
    pages: null,
    words: [],
    idOfWordsToStudy: [],
    isLoading: false,
}

const wordSlice = createSlice({
    name: 'wordSlice',
    initialState,
    reducers: {
        clearWords: (state) => {
            state.count = 0
            state.learned = null
            state.limit = 10
            state.page = 1
            state.pages = null
            state.words = []
            state.isLoading = false
        },
        addWordsToStudy: (state, action: PayloadAction<Array<number>>) => {
            state.idOfWordsToStudy.push(...action.payload)
        },
        deleteWordsToStudy: (state, action: PayloadAction<Array<number>>) => {
            if (action.payload.length === 0) {
                state.idOfWordsToStudy = []
                return
            }
            state.idOfWordsToStudy = state.idOfWordsToStudy.filter(
                (item) => !action.payload.includes(item)
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordsFromDictionary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchWordsFromDictionary.fulfilled,
                (
                    state,
                    action: PayloadAction<getWordsFromDictionaryResponseType>
                ) => {
                    let learnedWords = 0

                    state.page = action.payload.page + 1

                    state.words.push(...action.payload.words)
                    state.limit = action.payload.limit
                    state.count = action.payload.count
                    state.pages = action.payload.pages

                    action.payload.words.forEach((item) => {
                        if (item.isLearned) learnedWords++
                    })
                    state.count = action.payload.count
                    state.limit = action.payload.limit
                    state.page = action.payload.page
                    state.pages = action.payload.pages
                    state.words = action.payload.words
                    state.learned = learnedWords
                    state.isLoading = false
                }
            )
            .addCase(fetchWordsFromDictionary.rejected, (state, action) => {
                state.isLoading = false
            })
            //--------------------------
            .addCase(updateWord.pending, (state) => {})
            .addCase(
                updateWord.fulfilled,
                (state, action: PayloadAction<wordType>) => {
                    const indexOfWord = state.words.findIndex(
                        (item) => item.id === action.payload.id
                    )

                    state.words[indexOfWord].createdAt =
                        action.payload.createdAt
                    state.words[indexOfWord].name = action.payload.name
                    state.words[indexOfWord].translation =
                        action.payload.translation
                    state.words[indexOfWord].isLearned =
                        action.payload.isLearned
                }
            )
            .addCase(updateWord.rejected, (state, action) => {})
            //--------------------------
            .addCase(addWord.pending, (state) => {})
            .addCase(
                addWord.fulfilled,
                (state, action: PayloadAction<wordType>) => {
                    state.words.push(action.payload)
                    if (state.count) state.count += 1
                    else state.count = 1
                }
            )
            .addCase(addWord.rejected, (state, action) => {})
            //--------------------------
            .addCase(deleteWord.pending, (state) => {})
            .addCase(
                deleteWord.fulfilled,
                (
                    state,
                    action: PayloadAction<{ wordId: number; success: boolean }>
                ) => {
                    if (action.payload.success) {
                        state.words = state.words.filter(
                            (item) => item.id != action.payload.wordId
                        )
                        if (state.count) state.count -= 1
                        else state.count = 0
                    }
                }
            )
            .addCase(deleteWord.rejected, (state, action) => {})
        //--------------------------
    },
})

export const { clearWords, addWordsToStudy, deleteWordsToStudy } =
    wordSlice.actions

export default wordSlice.reducer
