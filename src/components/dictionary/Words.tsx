import React from 'react'

import { useAppSelector } from '../../hooks/reduxHooks'
import Word from './Word'
import WordsLoader from './WordsLoader'

type WordsProps = {
    dictionaryId: number
}

const Words: React.FC<WordsProps> = ({ dictionaryId }) => {
    const words = useAppSelector((state) => state.word.words)
    const isLoading = useAppSelector((state) => state.word.isLoading)

    const [selectedWords, setSelectedWords] = React.useState<Array<number>>([])

    const onSelectWordHandler = (data: {
        wordId: number
        isChecked: boolean
    }) => {
        if (data.isChecked) setSelectedWords((prev) => [...prev, data.wordId])
        else if (!data.isChecked) {
            setSelectedWords(
                selectedWords.filter((item) => item != data.wordId)
            )
        }
    }

    return (
        <div>
            {!isLoading &&
                words.length > 0 &&
                words.map((item) => (
                    <Word
                        key={item.id}
                        name={item.name}
                        translation={item.translation}
                        id={item.id}
                        isLearned={item.isLearned}
                        onSelectWord={onSelectWordHandler}
                        isChecked={selectedWords.includes(item.id)}
                    />
                ))}
            {isLoading && <WordsLoader number={3} />}
        </div>
    )
}

export default Words
