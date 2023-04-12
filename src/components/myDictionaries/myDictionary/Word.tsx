import React from 'react'
import PencilIcon from '../../../assets/icons/PencilIcon'
import SaveIcon from '../../../assets/icons/SaveIcon'
import TrashIcon from '../../../assets/icons/TrashIcon'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { openInfoBlock } from '../../../redux/features/appSlice'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import Checkbox from '../../input/Checkbox'
import TextInput from '../../input/TextInput'
import Status from '../../info/Status'
import { IWord } from '../../../types/models'
import Button from '../../input/Button'

type WordProps = {
    word: IWord
    isChecked: boolean
    onSelectWord: (word: IWord, isChecked: boolean) => void
}

const Word: React.FC<WordProps> = ({ word, onSelectWord, isChecked }) => {
    const deviceType = useAppSelector((state) => state.app.deviceType)

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

    const [wordValue, setWordValue] = React.useState<string>(word.name)
    const [translationValue, setTranslationValue] = React.useState<string>(
        word.translation
    )
    const [isEditWord, setIsEditWord] = React.useState<boolean>(false)
    const [fieldsError, setFieldsError] = React.useState<{
        wordError: string | undefined
        translationError: string | undefined
    }>({ wordError: undefined, translationError: undefined })

    const onSelectWordHandler = (isChecked: boolean) =>
        onSelectWord(word, isChecked)

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
        let isError = false

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

        if (wordValue === word.name && translationValue === word.translation) {
            setIsEditWord((prev) => !prev)
            return
        }

        updateWord({
            data: {
                name: wordValue,
                translation: translationValue,
            },
            wordId: word.id,
        })

        setIsEditWord((prev) => !prev)
    }

    const onDeleteWordHandler = () => {
        deleteWord({ wordId: word.id })
        setIsEditWord((prev) => !prev)
        onSelectWord(word, false)
    }

    return (
        <div className="bg-white p-[10px] sm:p-[24px] mb-[10px] rounded-[15px] sm:rounded-[25px] shadow-secondary relative">
            <div className="absolute top-[8px] right-[8px] sm:top-[12px] sm:right-[12px]">
                {word.isLearned ? (
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
                <PencilIcon
                    width={deviceType === 'Mobile' ? '25px' : '30px'}
                    height={deviceType === 'Mobile' ? '25px' : '30px'}
                    color="#53A0FF"
                />
            </div>

            <div className="flex items-center">
                <Checkbox
                    name={`select-word-${word.id}`}
                    id={`select-word-${word.id}`}
                    onSelect={onSelectWordHandler}
                    isChecked={isChecked}
                />
                <div className="pl-[10px] sm:pl-[25px]">
                    <p className="text-[20px] leading-6 sm:text-[24px] sm:leading-[29px] text-black">
                        {word.name}
                    </p>
                    <p className="text-[15px] leading-[18px] sm:text-[20px] sm:leading-6 text-black/50">
                        {word.translation}
                    </p>
                </div>
            </div>

            <div
                className="w-full transition-all overflow-hidden"
                style={{
                    height: isEditWord
                        ? deviceType === 'Mobile'
                            ? '172px'
                            : '205px'
                        : '0px',
                }}
            >
                <div className="pt-[24px]">
                    <TextInput
                        size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        value={wordValue}
                        name={`word-${word.id}-dictionary`}
                        onChange={onChangeWordValueHandler}
                        placeholder="Word"
                        error={fieldsError.wordError}
                    />
                    <TextInput
                        size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        styles="mt-[8px]"
                        value={translationValue}
                        name={`translation-${word.id}-dictionary`}
                        onChange={onChangeTranslationValueHandler}
                        placeholder="Translation"
                        error={fieldsError.translationError}
                    />
                    <div className="flex justify-center pt-[15px]">
                        <Button
                            color="#FE2836"
                            hoverColor="#ff7071"
                            activeColor="#d60428"
                            onClick={onDeleteWordHandler}
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        >
                            Delete
                        </Button>
                        <Button
                            styles="mx-[20px]"
                            color="#1D9745"
                            hoverColor="#24b553"
                            activeColor="#157b2f"
                            onClick={onSaveChangesHandler}
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        >
                            Save
                        </Button>
                        <Button
                            color="#0086EA"
                            hoverColor="#53A0FF"
                            activeColor="#0D6CBD"
                            onClick={onEditWordHandler}
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Word
