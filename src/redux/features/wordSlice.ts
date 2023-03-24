import {
    IGetWordsFromDictionaryResponse,
    IWord,
} from './../../types/models/IWord'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    idOfWordsToStudy: Array<number>
    totalInformationAboutMyDictionary: {
        totalWords: number
        totalLearnedWords: number
    }
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
        setTotalInformationAboutMyDictionary: (
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
    setTotalInformationAboutMyDictionary,
} = wordSlice.actions

export default wordSlice.reducer
