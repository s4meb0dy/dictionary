import React from 'react'
import { InputSizeEnum } from '../../types'
import CloseIcon from '../icons/CloseIcon'
import TextInput from '../input/TextInput'

type WordProps = {
    onChangeValue: (data: {
        id: string
        word: string
        translation: string
    }) => void
    id: string
    onDelete: (id: string) => void
}

const Word: React.FC<WordProps> = ({ onChangeValue, id, onDelete }) => {
    const [wordValue, setWordValue] = React.useState('')
    const [translationValue, setTranslationValue] = React.useState('')

    const onChangeWordHandler = (e: React.ChangeEvent<any>) => {
        setWordValue(e.target.value)
        onChangeValue({
            id,
            word: e.target.value,
            translation: translationValue,
        })
    }

    const onChangeTranslationHandler = (e: React.ChangeEvent<any>) => {
        setTranslationValue(e.target.value)
        onChangeValue({ id, word: wordValue, translation: e.target.value })
    }

    const onDeleteHandler = () => {
        onDelete(id)
    }

    const [isHoverCloseBtn, setIsHoverCloseBtn] = React.useState(false)

    const onEnterHoverHandler = () => setIsHoverCloseBtn(true)

    const onLeaveHoverHandler = () => setIsHoverCloseBtn(false)

    return (
        <div className="p-[30px] mb-[30px] bg-secondaryBg shadow-primary rounded-[25px] relative animate-appearance">
            <div
                onMouseEnter={onEnterHoverHandler}
                onMouseLeave={onLeaveHoverHandler}
                onClick={onDeleteHandler}
                className="absolute w-[44px] h-[44px] border-2 border-[#0D6CBD] top-[-20px] right-[-10px] rounded-full p-[2px] cursor-pointer flex justify-center items-center transition-colors"
                style={{
                    backgroundColor: isHoverCloseBtn ? '#ce4a4a' : '#C33636',
                }}
            >
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
