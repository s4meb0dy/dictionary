import { dictionaryApi } from './../services/dictionaryApi'
import { IDictionary } from './../../types/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    totalInformationAboutMyDictionaries: {
        totalWords: number
        totalLearnedWords: number
        totalDictionaries: number
    }
}

const initialState: initialStateType = {
    totalInformationAboutMyDictionaries: {
        totalWords: 0,
        totalLearnedWords: 0,
        totalDictionaries: 0,
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
                
                const totalWords = 0
                const totalLearnedWords = 0

                // action.payload.forEach((item) => {
                    // totalWords += item.total
                    // totalLearnedWords += item.learned
                // })

                state.totalInformationAboutMyDictionaries.totalLearnedWords =
                    totalLearnedWords
                state.totalInformationAboutMyDictionaries.totalWords =
                    totalWords
                state.totalInformationAboutMyDictionaries.totalDictionaries =
                    action.payload.length
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
