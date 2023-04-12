import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../types/models'
import { shuffleArray } from '../../utils/shuffleArray'

type initialStateType = {
    modes: { id: number; name: string }[]
    mode: number | null
    /**
     *   progress of session (max 100)
     */
    progress: number
    idOfWordsWithErrors: number[]
    /**
     *   Word's index
     */
    studyWay: number[]
    /**
     *   0 - select mode, after - words, end - results
     */
    currentStep: number

    wordsToStudy: IWord[]
}

const initialState: initialStateType = {
    modes: [
        {
            id: 1,
            name: 'Memorizing',
        },
    ],
    mode: null,
    progress: 0,
    idOfWordsWithErrors: [],
    studyWay: [],
    currentStep: 0,
    wordsToStudy: [],
}

const studySlice = createSlice({
    name: 'studySlice',
    initialState,
    reducers: {
        clearStudyingSessionInfo: (state, action: PayloadAction<void>) => {
            state.mode = null
            state.progress = 0
            state.idOfWordsWithErrors = []
            state.currentStep = 0
        },

        setMode: (state, action: PayloadAction<number>) => {
            state.mode = action.payload
            state.studyWay = shuffleArray([
                ...state.wordsToStudy.map((word, index) => index),
                ...state.wordsToStudy.map((word, index) => index),
            ])
        },
        nextStep: (state, action: PayloadAction<void>) => {
            if (state.studyWay.length >= state.currentStep)
                state.currentStep += 1
        },
        prevStep: (state, action: PayloadAction<void>) => {
            if (state.currentStep > 0) state.currentStep -= 1
        },
        setError: (state, action: PayloadAction<number>) => {
            state.idOfWordsWithErrors.push(action.payload)
        },

        addWordToStudy: (state, action: PayloadAction<IWord>) => {
            state.wordsToStudy.push(action.payload)
        },
        deleteWordToStudy: (
            state,
            action: PayloadAction<IWord | undefined>
        ) => {
            if (action.payload) {
                state.wordsToStudy = state.wordsToStudy.filter(
                    (word) => word.id !== action.payload?.id
                )
            } else {
                state.wordsToStudy = []
            }
        },
    },
})

export const {
    addWordToStudy,
    deleteWordToStudy,
    clearStudyingSessionInfo,
    setMode,
    nextStep,
    prevStep,
    setError,
} = studySlice.actions

export default studySlice.reducer
