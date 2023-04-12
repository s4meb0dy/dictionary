import React from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Tag from '../../info/Tag'
import DictionaryInformation from '../../containers/DictionaryInformation'

type MyDictionaryHeaderProps = {
    dictionaryName: string
    access: string
    isLoading: boolean
}

const MyDictionaryHeader: React.FC<MyDictionaryHeaderProps> = ({
    dictionaryName,
    access,
    isLoading,
}) => {
    const { totalInformationAboutMyDictionary } = useAppSelector(
        (state) => state.word
    )

    const deviceType = useAppSelector((state) => state.app.deviceType)

    return (
        <header className="flex justify-between h-full px-[20px] lg:p-0">
            <DictionaryInformation
                title={dictionaryName}
                firstSubtitle={`${totalInformationAboutMyDictionary.totalWords} words`}
                secondSubtitle={`${totalInformationAboutMyDictionary.totalLearnedWords} studied words`}
                isLoading={isLoading}
            />
            <div className="flex flex-col justify-between items-end">
                <span className="">
                    {access === 'public' ? (
                        <Tag
                            name="Public"
                            color="#C89600"
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        />
                    ) : (
                        <Tag
                            name="Private"
                            color="#00AEBF"
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                        />
                    )}
                </span>
            </div>
        </header>
    )
}

export default MyDictionaryHeader
