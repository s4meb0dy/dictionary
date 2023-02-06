import React from 'react'
import PluseIcon from '../../assets/icons/PluseIcon'
import Preloader from '../../assets/Preloader'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addWord } from '../../redux/features/wordSlice'
import Button from '../Button'
import TextInput from '../input/TextInput'

type AddWordProps = {
    dictionaryId: number
}

const AddWord: React.FC<AddWordProps> = ({ dictionaryId }) => {
    const dispatch = useAppDispatch()

    const [wordValue, setWordValue] = React.useState<string>('')
    const [translationValue, setTranslationValue] = React.useState<string>('')

    const [fieldsError, setFieldsError] = React.useState<{
        wordError: string | undefined
        translationError: string | undefined
    }>({ wordError: undefined, translationError: undefined })

    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const onChangeWordValueHandler = (e: React.ChangeEvent<any>) => {
        setWordValue(e.target.value)
        setFieldsError((prev) => {
            return { ...prev, wordError: undefined }
        })
    }
    const onChangeTranslationValueHandler = (e: React.ChangeEvent<any>) => {
        setTranslationValue(e.target.value)
        setFieldsError((prev) => {
            return { ...prev, translationError: undefined }
        })
    }

    const onOpenHandler = () => {
        setIsOpen((prev) => !prev)
    }

    const reset = () => {
        setWordValue('')
        setTranslationValue('')
    }

    const onSaveHandler = () => {
        let isError: boolean = false

        if (wordValue === '') {
            isError = true
            setFieldsError((prev) => {
                return {
                    translationError: prev.translationError,
                    wordError: 'Required field',
                }
            })
        }

        if (translationValue === '') {
            isError = true
            setFieldsError((prev) => {
                return {
                    wordError: prev.wordError,
                    translationError: 'Required field',
                }
            })
        }

        if (isError) return

        setIsLoading(true)

        dispatch(
            addWord({
                dictionaryId,
                name: wordValue,
                translation: translationValue,
            })
        ).then((res) => {
            setIsOpen(false)
            setIsLoading(false)
            reset()
        })
    }

    return (
        <div className="relative">
            <div
                className={`bg-white overflow-hidden shadow-secondary rounded-[25px] transition-all relative  ${
                    isLoading && 'blur-[2px] pointer-events-none'
                }`}
                style={{ height: isOpen ? '229px' : '0px' }}
            >
                <div className="bg-white p-[24px] rounded-[25px] flex flex-col items-center ">
                    <TextInput
                        value={wordValue}
                        name="word-add-word-dictionary"
                        size="large"
                        onChange={onChangeWordValueHandler}
                        styles="mb-[8px]"
                        placeholder="Word"
                        width="100%"
                        error={fieldsError.wordError}
                    />
                    <TextInput
                        value={translationValue}
                        name="translation-add-word-dictionary"
                        size="large"
                        onChange={onChangeTranslationValueHandler}
                        placeholder="Translation"
                        width="100%"
                        error={fieldsError.translationError}
                    />
                    <Button
                        width="185px"
                        size="large"
                        name="Save"
                        color="#1D9745"
                        hoverColor="#24b553"
                        activeColor="#157b2f"
                        onClick={onSaveHandler}
                        styles="mt-[15px]"
                    />
                </div>
            </div>
            <div className="pt-[15px] flex justify-center">
                <Button
                    size="medium"
                    name={isOpen ? 'Close' : 'Add word'}
                    width="441px"
                    color="#0086EA"
                    hoverColor="#53A0FF"
                    activeColor="#0D6CBD"
                    onClick={onOpenHandler}
                    RightIcon={
                        isOpen ? undefined : (
                            <PluseIcon
                                width="20px"
                                height="20px"
                                color="white"
                            />
                        )
                    }
                />
            </div>
            {/* {isLoading && <Preloader />} */}
        </div>
    )
}

export default AddWord
