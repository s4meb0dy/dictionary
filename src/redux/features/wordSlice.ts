import { IGetWordsFromDictionaryResponse } from './../../types/models/IWord'
import { dictionaryApi } from './../services/dictionaryApi'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    idOfWordsToStudy: Array<number>
    totalInformationAboutMyDictionary: {
        totalWords: number
        totalLearnedWords: number
    }
    // totalInformationAboutPublicDictionary: {
    //     totalWords: number
    //     totalLearnedWords: number
    // }
}

const initialState: initialStateType = {
    totalInformationAboutMyDictionary: {
        totalWords: 0,
        totalLearnedWords: 0,
    },

    idOfWordsToStudy: [],
}

const wordSlice = createSlice({
    name: 'wordSlice',
    initialState,
    reducers: {
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
        setTotalInformationAboutDictionary: (
            state,
            action: PayloadAction<IGetWordsFromDictionaryResponse>
        ) => {
            state.totalInformationAboutMyDictionary.totalWords =
                action.payload.count
            let totalLearnedWords = 0
            action.payload.words.forEach((word) => {
                word.isLearned && ++totalLearnedWords
            })
        },
    },
})

export const {
    addWordsToStudy,
    deleteWordsToStudy,
    setTotalInformationAboutDictionary,
} = wordSlice.actions

export default wordSlice.reducer
