import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { addWordToStudy, deleteWordToStudy } from '../../../redux/features'
import { IWord } from '../../../types/models'
import Word from './Word'
import WordsLoader from './WordsLoader'

type WordsProps = {
    dictionaryId: number
    words: IWord[]
    isLoading: boolean
}

const Words: React.FC<WordsProps> = ({ dictionaryId, words, isLoading }) => {
    const wordsToStudy = useAppSelector((state) => state.study.wordsToStudy)
    const dispatch = useAppDispatch()

    const onSelectWordHandler = (word: IWord, isChecked: boolean) => {
        if (isChecked) {
            dispatch(addWordToStudy(word))
        } else if (!isChecked) {
            dispatch(deleteWordToStudy(word))
        }
    }

    return (
        <li>
            {!isLoading ? (
                words.map((item) => {
                    return (
                        <div className="" key={item.id}>
                            <Word
                                word={item}
                                onSelectWord={onSelectWordHandler}
                                isChecked={wordsToStudy.some(
                                    (word) => word.id === item.id
                                )}
                            />
                        </div>
                    )
                })
            ) : (
                <WordsLoader number={10} />
            )}
        </li>
    )
}

export default Words
