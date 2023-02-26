import React from 'react'
import PencilIcon from '../../../assets/icons/PencilIcon'
import SaveIcon from '../../../assets/icons/SaveIcon'
import TrashIcon from '../../../assets/icons/TrashIcon'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { openInfoBlock } from '../../../redux/features/appSlice'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import Checkbox from '../../input/Checkbox'
import TextInput from '../../input/TextInput'
import Status from '../../info/Status'

type WordProps = {
    name: string
    translation: string
    id: number
    isLearned: boolean
    isChecked: boolean
    onSelectWord: (data: { wordId: number; isChecked: boolean }) => void
}

const Word: React.FC<WordProps> = ({
    name,
    translation,
    id,
    isLearned,
    onSelectWord,
    isChecked,
}) => {
    const [updateWord, { error: updateError, isSuccess: isSuccessUpdate }] =
        dictionaryApi.useUpdateWordMutation()
    const [deleteWord, { error: deleteError, isSuccess: isSuccessDelete }] =
        dictionaryApi.useDeleteWordMutation()

    useErrorHandler(updateError as string)
    useErrorHandler(deleteError as string)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (isSuccessUpdate) {
            dispatch(
                openInfoBlock({
                    title: 'Success',
                    type: 'success',
                    text: 'The word has been updated',
                })
            )
        }
    }, [isSuccessUpdate])

    React.useEffect(() => {
        if (isSuccessDelete) {
            dispatch(
                openInfoBlock({
                    title: 'Success',
                    type: 'success',
                    text: 'The word has been deleted',
                })
            )
        }
    }, [isSuccessDelete])

    const [wordValue, setWordValue] = React.useState<string>(name)
    const [translationValue, setTranslationValue] =
        React.useState<string>(translation)
    const [isEditWord, setIsEditWord] = React.useState<boolean>(false)
    const [fieldsError, setFieldsError] = React.useState<{
        wordError: string | undefined
        translationError: string | undefined
    }>({ wordError: undefined, translationError: undefined })

    // const dispatch = useAppDispatch()

    const onSelectWordHandler = (isChecked: boolean) =>
        onSelectWord({ wordId: id, isChecked })

    const onEditWordHandler = () => setIsEditWord((prev) => !prev)
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

    const onSaveChangesHandler = () => {
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

        if (wordValue === name && translationValue === translation) {
            setIsEditWord((prev) => !prev)
            return
        }

        updateWord({
            data: {
                name: wordValue,
                translation: translationValue,
            },
            wordId: id,
        })

        setIsEditWord((prev) => !prev)
    }

    const onDeleteWordHandler = () => {
        deleteWord({ wordId: id })
        setIsEditWord((prev) => !prev)
        onSelectWord({ wordId: id, isChecked: false })
    }

    return (
        <div className="bg-white p-[24px] mb-[10px] rounded-[25px] shadow-secondary relative">
            <div className="absolute top-[12px] right-[12px]">
                {isLearned ? (
                    <Status type="success" />
                ) : (
                    <Status type="warning" />
                )}
            </div>

            <div
                onClick={onEditWordHandler}
                className={`absolute bottom-[10px] right-[10px] cursor-pointer transition-opacity ${
                    isEditWord ? 'opacity-0 pointer-events-none' : 'opacity-1'
                }`}
            >
                <PencilIcon width="30px" height="30px" color="#53A0FF" />
            </div>

            <div>
                <div className="flex items-center">
                    <Checkbox
                        name={`select-word-${id}`}
                        id={`select-word-${id}`}
                        onSelect={onSelectWordHandler}
                        isChecked={isChecked}
                    />
                    <div className="pl-[25px]">
                        <p className="text-[24px] leading-[29px] text-black">
                            {name}
                        </p>
                        <p className="text-[20px] leading-[24px] text-black/50">
                            {translation}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="w-full transition-all overflow-hidden"
                style={{ height: isEditWord ? '150px' : '0px' }}
            >
                {isEditWord && (
                    <>
                        <div
                            onClick={onDeleteWordHandler}
                            className="absolute bottom-[75px] right-[13px] cursor-pointer animate-appearance"
                        >
                            <TrashIcon
                                width="30px"
                                height="30px"
                                color="#FE2836"
                            />
                        </div>
                        <div
                            onClick={onSaveChangesHandler}
                            className="absolute bottom-[24px] right-[13px] cursor-pointer animate-appearance"
                        >
                            <SaveIcon
                                width="30px"
                                height="30px"
                                color="#1D9745"
                            />
                        </div>
                    </>
                )}
                <div className="pt-[24px] pr-[35px]">
                    <TextInput
                        size="large"
                        value={wordValue}
                        name={`word-${id}-dictionary`}
                        onChange={onChangeWordValueHandler}
                        placeholder="Word"
                        error={fieldsError.wordError}
                    />
                    <TextInput
                        size="large"
                        styles="mt-[8px]"
                        value={translationValue}
                        name={`translation-${id}-dictionary`}
                        onChange={onChangeTranslationValueHandler}
                        placeholder="Translation"
                        error={fieldsError.translationError}
                    />
                </div>
            </div>
        </div>
    )
}

export default Word
