import { getWordsByDictionaryIdType, wordType } from './../../types/apiTypes'
import { AppDispatch } from '../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { openInfoBlock } from './appSlice'
import WordAPI from '../../api/wordApi'
import { errorHandling } from '../services'

export const fetchWordsByDictionaryId = createAsyncThunk<
    getWordsByDictionaryIdType,
    { dictionaryId: number },
    { rejectValue: string; dispatch: AppDispatch }
>('user/fetchWordsByDictionaryId', async (data, thunkAPI) => {
    try {
        const response = await WordAPI.fetchWordsByDictionaryId({
            dictionaryId: data.dictionaryId,
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
    { dictionaryId: number; name: string; translation: string },
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
        const response = await WordAPI.deleteWord(wordId)

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
    count: number | null
    learnedWords: number | null
    limit: number | null
    page: number | null
    pages: number | null
    words: Array<{
        id: number
        name: string
        translation: string
        createdAt: string
        isLearned: boolean
    }>
    isLoading: boolean
}

const initialState: initialStateType = {
    count: null,
    learnedWords: null,
    limit: null,
    page: null,
    pages: null,
    words: [],
    isLoading: false,
}

const wordSlice = createSlice({
    name: 'wordSlice',
    initialState,
    reducers: {
        clearWords: (state) => {
            state.count = null
            state.learnedWords = null
            state.limit = null
            state.page = null
            state.pages = null
            state.words = []
            state.isLoading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordsByDictionaryId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchWordsByDictionaryId.fulfilled,
                (state, action: PayloadAction<getWordsByDictionaryIdType>) => {
                    let learnedWords = 0

                    action.payload.words.forEach((item) => {
                        if (item.isLearned) learnedWords++
                    })
                    state.count = action.payload.count
                    state.limit = action.payload.limit
                    state.page = action.payload.page
                    state.pages = action.payload.pages
                    state.words = action.payload.words
                    state.learnedWords = learnedWords
                    state.isLoading = false
                }
            )
            .addCase(fetchWordsByDictionaryId.rejected, (state, action) => {
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
                    }
                }
            )
            .addCase(deleteWord.rejected, (state, action) => {})
        //--------------------------
    },
})

export const { clearWords } = wordSlice.actions

export default wordSlice.reducer
