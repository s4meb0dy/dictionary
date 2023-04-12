import classNames from 'classnames'
import React from 'react'
import ContentLoader from 'react-content-loader'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { openInfoBlock } from '../../../redux/features'
import { dictionaryApi } from '../../../redux/services'
import { AuthorizationEnum } from '../../../types'
import Button from '../../input/Button'
import DictionaryInformation from '../../containers/DictionaryInformation'

type PublicDictionaryHeaderProps = {
    dictionaryName: string
    dictionaryId: number
    totalWords: number
    isLoading: boolean
}

const PublicDictionaryHeader: React.FC<PublicDictionaryHeaderProps> = ({
    dictionaryName,
    dictionaryId,
    totalWords,
    isLoading,
}) => {
    const [copyDictionary, { isLoading: isLoadingCopy, isSuccess, error }] =
        dictionaryApi.useCopyDictionaryMutation()

    useErrorHandler(error as string)

    const dispatch = useAppDispatch()

    const deviceType = useAppSelector((state) => state.app.deviceType)

    React.useEffect(() => {
        if (isSuccess)
            dispatch(
                openInfoBlock({
                    type: 'success',
                    title: 'Success',
                    text: 'The dictionary has be copied',
                })
            )
    }, [isSuccess])

    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    const onCopyDictionaryHandler = () => {
        copyDictionary(dictionaryId)
    }

    const headerStyle = classNames(
        'h-full px-[20px] lg:p-0 flex justify-between',
        {
            'flex-col items-start': deviceType === 'Mobile',
        }
    )

    return (
        <header className={headerStyle}>
            <DictionaryInformation
                isLoading={isLoading}
                title={dictionaryName}
                firstSubtitle={`${totalWords} ${
                    totalWords > 1 ? 'words' : 'word'
                }`}
            ></DictionaryInformation>

            {authorizationStatus === AuthorizationEnum.Login && (
                <Button
                    size={deviceType === 'Mobile' ? 'small' : 'medium'}
                    color="#81AC00"
                    hoverColor="#93c933"
                    activeColor="#6b8f00"
                    onClick={onCopyDictionaryHandler}
                >
                    Copy this dictionary
                </Button>
            )}
        </header>
    )
}

export default PublicDictionaryHeader
