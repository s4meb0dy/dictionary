import React from 'react'
import ContentLoader from 'react-content-loader'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { openInfoBlock } from '../../../redux/features'
import { dictionaryApi } from '../../../redux/services'
import { AuthorizationEnum } from '../../../types'
import Button from '../../input/Button'

type DictionaryInformationProps = {
    dictionaryName: string
    dictionaryId: number
    totalWords: number
    isLoading: boolean
}

const PublicDictionaryInformation: React.FC<DictionaryInformationProps> = ({
    dictionaryName,
    dictionaryId,
    totalWords,
    isLoading,
}) => {
    const [copyDictionary, { isLoading: isLoadingCopy, isSuccess, error }] =
        dictionaryApi.useCopyDictionaryMutation()

    useErrorHandler(error as string)

    const dispatch = useAppDispatch()

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

    return (
        <>
            {!isLoading ? (
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-white tracking-wide backdrop:font-medium text-[40px] pb-[12px] leading-[50px]">
                            {dictionaryName}
                        </h3>
                        <p className="text-white tracking-wide backdrop:text-[20px] leading-[25px]">
                            {`${totalWords} ${
                                totalWords > 1 ? 'words' : 'word'
                            }`}
                        </p>
                    </div>
                    {authorizationStatus === AuthorizationEnum.Login && (
                        <Button
                            size="medium"
                            name="Copy this dictionary"
                            color="#81AC00"
                            hoverColor="#93c933"
                            activeColor="#6b8f00"
                            onClick={onCopyDictionaryHandler}
                        />
                    )}
                </div>
            ) : (
                <ContentLoader
                    speed={2}
                    width={200}
                    height={113}
                    viewBox="0 0 200 110"
                    backgroundColor="#257bc4"
                    foregroundColor="#0D6CBD"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="200" height="40" />
                    <rect x="0" y="58" rx="5" ry="5" width="195" height="19" />
                </ContentLoader>
            )}
        </>
    )
}

export default PublicDictionaryInformation
