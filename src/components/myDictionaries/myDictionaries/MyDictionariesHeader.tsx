import React from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import DictionaryInformation from '../../containers/DictionaryInformation'

const MyDictionariesHeader: React.FC = () => {
    // const { isLoading } = useAppSelector((state) => state.dictionary)
    const { totalDictionaries, totalLearnedWords, totalWords } = useAppSelector(
        (state) => state.dictionary.totalInformationAboutMyDictionaries
    )
    const { isLoading } = dictionaryApi.useGetMyDictionariesQuery()

    return (
        <header className="px-[20px] lg:p-0">
            <DictionaryInformation
                isLoading={isLoading}
                title={`${totalWords} words`}
                firstSubtitle={`${totalLearnedWords} studied words`}
                secondSubtitle={`${totalDictionaries} dictionaries`}
            />
        </header>
    )
}

export default MyDictionariesHeader
