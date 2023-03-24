import React from 'react'

import PluseIcon from '../../../assets/icons/PluseIcon'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { openInfoBlock } from '../../../redux/features/appSlice'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import Button from '../../input/Button'
import TextInput from '../../input/TextInput'
import LearnWordsBtn from './LearnWordsBtn'

type AddWordProps = {
    dictionaryId: number
}

const AddWord: React.FC<AddWordProps> = ({ dictionaryId }) => {
    const dispatch = useAppDispatch()

    const [createWord, { isLoading, error, isSuccess: isSuccessCreate }] =
        dictionaryApi.useCreateWordMutation()

    const deviceType = useAppSelector((state) => state.app.deviceType)

    React.useEffect(() => {
        if (isSuccessCreate) {
            dispatch(
                openInfoBlock({
                    title: 'Success',
                    type: 'success',
                    text: 'The word was created',
                })
            )
        }
    }, [isSuccessCreate])

    useErrorHandler(error as string)

    const [wordValue, setWordValue] = React.useState<string>('')
    const [translationValue, setTranslationValue] = React.useState<string>('')

    const [fieldsError, setFieldsError] = React.useState<{
        wordError: string | undefined
        translationError: string | undefined
    }>({ wordError: undefined, translationError: undefined })

    const [isOpen, setIsOpen] = React.useState<boolean>(false)

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

        // setIsLoading(true)

        createWord({
            dictionaryId,
            data: {
                name: wordValue,
                translation: translationValue,
            },
        }).finally(() => {
            setIsOpen(false)
            reset()
        })
    }

    return (
        <div className="relative">
            <div
                className={`bg-white overflow-hidden shadow-secondary rounded-[15px] sm:rounded-[25px] transition-all relative mb-[10px] ${
                    isLoading && 'blur-[2px] pointer-events-none'
                }`}
                style={{ height: isOpen ? deviceType === 'Mobile' ? '168px' : '229px'  : '0px' }}
            >
                <div className="bg-white p-[10px] sm:p-[24px] flex flex-col items-center ">
                    <TextInput
                        value={wordValue}
                        name="word-add-word-dictionary"
                        size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        onChange={onChangeWordValueHandler}
                        styles="mb-[8px]"
                        placeholder="Word"
                        width="100%"
                        error={fieldsError.wordError}
                    />
                    <TextInput
                        value={translationValue}
                        name="translation-add-word-dictionary"
                        size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        onChange={onChangeTranslationValueHandler}
                        placeholder="Translation"
                        width="100%"
                        error={fieldsError.translationError}
                    />
                    <Button
                        width="185px"
                        size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        color="#1D9745"
                        hoverColor="#24b553"
                        activeColor="#157b2f"
                        onClick={onSaveHandler}
                        styles="mt-[15px]"
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className="pt-[5px] sm:pt-[15px] flex justify-center">
                <Button
                    size={deviceType === 'Mobile' ? 'small' : 'medium'}
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
                >
                    {isOpen ? 'Close' : 'Add word'}
                </Button>
                <LearnWordsBtn />
            </div>
        </div>
    )
}

export default AddWord
