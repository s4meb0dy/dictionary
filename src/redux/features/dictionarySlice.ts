import { dictionaryApi } from './../services/dictionaryApi'
import { IDictionary } from './../../types/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    totalInformationAboutMyDictionaries: {
        totalWords: number | null
        totalLearnedWords: number | null
        totalDictionaries: number | null
    }
}

const initialState: initialStateType = {
    totalInformationAboutMyDictionaries: {
        totalWords: null,
        totalLearnedWords: null,
        totalDictionaries: null,
    },
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addMatcher(
            dictionaryApi.endpoints.getMyDictionaries.matchFulfilled,
            (state, action: PayloadAction<IDictionary[]>) => {

                // let totalWords = 0
                // let totalLearnedWords = 0

                // action?.payload?.forEach((item) => {
                //     totalWords += item.total
                //     totalLearnedWords += item.learned
                // })

                // state.totalInformationAboutMyDictionaries.totalLearnedWords =
                //     totalLearnedWords
                // state.totalInformationAboutMyDictionaries.totalWords =
                //     totalWords
                // state.totalInformationAboutMyDictionaries.totalDictionaries =
                //     action.payload.length
            }
        )
        .addMatcher(
            dictionaryApi.endpoints.getMyDictionaries.matchRejected,
            (state, action) => {
                console.log('error')
            }
        )
        
    },
})

export default dictionarySlice.reducer
