import React from 'react'
import CloseIcon from '../../../assets/icons/CloseIcon'
import { useAppSelector } from '../../../hooks/reduxHooks'
import TextInput from '../../input/TextInput'

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
    const { colors, deviceType } = useAppSelector((state) => state.app)
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
        <li
            style={{ backgroundColor: colors.secondaryColor }}
            className=" p-[15px] sm:p-[30px] mb-[15px] sm:mb-[30px] shadow-primary rounded-[15px] sm:rounded-[25px] relative animate-appearance"
        >
            <div
                onMouseEnter={onEnterHoverHandler}
                onMouseLeave={onLeaveHoverHandler}
                onClick={onDeleteHandler}
                className="absolute w-[30px] h-[30px] sm:w-[44px] sm:h-[44px] border-2 border-[#0D6CBD] top-[-15px] right-[-8px] sm:top-[-20px] sm:right-[-10px] rounded-full p-[2px] cursor-pointer flex justify-center items-center transition-colors"
                style={{
                    backgroundColor: isHoverCloseBtn ? '#ce4a4a' : '#C33636',
                }}
            >
                <CloseIcon
                    color="white"
                    width={deviceType === 'Mobile' ? '20px' : '30px'}
                    height={deviceType === 'Mobile' ? '20px' : '30px'}
                />
            </div>
            <TextInput
                value={wordValue}
                name="word-create-dictionary"
                width="100%"
                onChange={onChangeWordHandler}
                size={deviceType === 'Mobile' ? 'medium' : 'large'}
                styles={'mb-[8px]'}
                placeholder="Word"
            />
            <TextInput
                value={translationValue}
                name="translation-create-dictionary"
                width="100%"
                onChange={onChangeTranslationHandler}
                size={deviceType === 'Mobile' ? 'medium' : 'large'}
                placeholder="Translation"
            />
        </li>
    )
}

export default Word
