import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
    addWordsToStudy,
    deleteWordsToStudy,
} from '../../../redux/features/wordSlice'
import { IWord } from '../../../types/models'
import Word from './Word'
import WordsLoader from './WordsLoader'

type WordsProps = {
    dictionaryId: number
    words: IWord[] | undefined
    isLoading: boolean
}

const Words: React.FC<WordsProps> = ({ dictionaryId, words, isLoading }) => {
    const idOfWordsToStudy = useAppSelector(
        (state) => state.word.idOfWordsToStudy
    )
    const dispatch = useAppDispatch()

    const onSelectWordHandler = (data: {
        wordId: number
        isChecked: boolean
    }) => {
        if (data.isChecked) {
            dispatch(addWordsToStudy([data.wordId]))
        } else if (!data.isChecked) {
            dispatch(deleteWordsToStudy([data.wordId]))
        }
    }

    return (
        <div>
            {!isLoading &&
                words &&
                words.map((item) => (
                    <Word
                        key={item.id}
                        name={item.name}
                        translation={item.translation}
                        id={item.id}
                        isLearned={item.isLearned}
                        onSelectWord={onSelectWordHandler}
                        isChecked={idOfWordsToStudy.includes(item.id)}
                    />
                ))}
            {isLoading && <WordsLoader number={3} />}
        </div>
    )
}

export default Words
