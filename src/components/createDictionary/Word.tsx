import React from 'react'
import { InputSizeEnum } from '../../types'
import CloseIcon from '../icons/CloseIcon'
import TextInput from '../input/TextInput'

type WordProps = {
    onChangeValue: (data: {id: number, word: string, translation: string}) => void
}

const Word: React.FC<WordProps> = ({onChangeValue}) => {
    const [wordValue, setWordValue] = React.useState('')
    const onChangeWordHandler = (e: React.ChangeEvent<any>) => {
        setWordValue(e.target.value)
    }

    const [translationValue, setTranslationValue] = React.useState('')
    const onChangeTranslationHandler = (e: React.ChangeEvent<any>) => {
        setTranslationValue(e.target.value)
    }

    return (
        <div className="p-[30px] mb-[30px] bg-secondaryBg shadow-primary rounded-[25px] relative animate-appearance">
            <div className="absolute w-[44px] h-[44px] border-2 border-[#0D6CBD] bg-[#C33636] top-[-20px] right-[-10px] rounded-full p-[2px] cursor-pointer flex justify-center items-center">
                <CloseIcon color="white" width="30px" height="30px" />
            </div>
            <TextInput
                value={wordValue}
                name="word-create-dictionary"
                width="100%"
                onChange={onChangeWordHandler}
                size={InputSizeEnum.Large}
                styles={'mb-[8px]'}
                placeholder="Word"
            />
            <TextInput
                value={translationValue}
                name="translation-create-dictionary"
                width="100%"
                onChange={onChangeTranslationHandler}
                size={InputSizeEnum.Large}
                placeholder="Translation"
            />
        </div>
    )
}

export default Word
