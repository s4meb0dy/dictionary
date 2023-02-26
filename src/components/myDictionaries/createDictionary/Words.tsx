import React from 'react'

import Button from '../../input/Button'
import Word from './Word'
import { nanoid } from 'nanoid'
import PluseIcon from '../../../assets/icons/PluseIcon'
import CheckCircleIcon from '../../../assets/icons/CheckCircleIcon'

type WordsProps = {
    onAddWord: () => void
    words: Array<{
        word: string
        translation: string
        id: string
    }>
    onChangeDictionaryDataValue: (data: {
        id: string
        word: string
        translation: string
    }) => void
    onDeleteDictionary: (id: string) => void
    onSave: () => void
}

const Words: React.FC<WordsProps> = ({
    onAddWord,
    words,
    onChangeDictionaryDataValue,
    onDeleteDictionary,
    onSave,
}) => {
    return (
        <>
            <div className="w-full">
                {words.length > 0 &&
                    words.map((item) => (
                        <Word
                            key={item.id}
                            id={item.id}
                            onChangeValue={onChangeDictionaryDataValue}
                            onDelete={onDeleteDictionary}
                        />
                    ))}
            </div>
            <div className="w-full bg-secondaryBg shadow-primary rounded-[10px] p-[6px] flex">
                <Button
                    styles="flex-auto mr-[6px]"
                    size="large"
                    name="Add"
                    color="#0086EA"
                    hoverColor="#53A0FF"
                    activeColor="#0D6CBD"
                    onClick={onAddWord}
                    RightIcon={
                        <PluseIcon width="20px" height="20px" color="white" />
                    }
                />
                <Button
                    width="185px"
                    size="large"
                    name="Save"
                    color="#1D9745"
                    hoverColor="#24b553"
                    activeColor="#157b2f"
                    disabled={words.length === 0}
                    onClick={onSave}
                    RightIcon={
                        <CheckCircleIcon
                            width="20px"
                            height="20px"
                            color="white"
                        />
                    }
                />
            </div>
        </>
    )
}

export default Words
