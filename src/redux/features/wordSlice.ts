import { getWordsByDictionaryIdType } from './../../types/apiTypes'
import { AppDispatch } from '../store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { openInfoBlock } from './appSlice'
import WordAPI from '../../api/wordApi'
import Words from '../../components/createDictionary/Words'

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
    reducers: {},
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
    },
})

export default wordSlice.reducer
