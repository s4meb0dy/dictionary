import React from 'react'
import { IWord } from '../../../types/models'
import Word from './Word'

interface WordsProps {
    words: IWord[]
}

const Words: React.FC<WordsProps> = ({ words }) => {
    return (
        <div className="flex flex-wrap items-start justify-between">
            {words &&
                words.map((item) => (
                    <Word
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        translation={item.translation}
                    />
                ))}
        </div>
    )
}

export default Words
