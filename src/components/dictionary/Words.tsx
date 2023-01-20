import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchWordsByDictionaryId } from '../../redux/features/wordSlice'
import Word from './Word'

type WordsProps = {
    dictionaryId: number
}

const Words: React.FC<WordsProps> = ({ dictionaryId }) => {
    const dispatch = useAppDispatch()
    const words = useAppSelector(state => state.word.words)
    React.useEffect(() => {
        dispatch(fetchWordsByDictionaryId({ dictionaryId: dictionaryId }))
    }, [])

    return (
        <div>
            {words.length > 0 && words.map(item => <Word key={item.id} name={item.name} translation={item.translation} id={item.id} isLearned={item.isLearned} />)}
        </div>
    )
}

export default Words
