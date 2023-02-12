import React from 'react'
import { useParams } from 'react-router-dom'
import AddWord from '../../components/dictionary/AddWord'
import DictionaryInformation from '../../components/dictionary/DictionaryInformation'
import Words from '../../components/dictionary/Words'
import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'
import { useAppDispatch } from '../../hooks/reduxHooks'
import {
    clearWords,
    deleteWordsToStudy,
    fetchWordsFromDictionary,
} from '../../redux/features/wordSlice'

const DictionaryPage: React.FC = () => {
    const { id, name, access } = useParams()

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (id) dispatch(fetchWordsFromDictionary(Number(id)))
        return () => {
            dispatch(clearWords())
            dispatch(deleteWordsToStudy([]))
        }
    }, [])

    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage>
                {id && name && access && (
                    <DictionaryInformation
                        dictionaryName={name}
                        access={access}
                    />
                )}
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                {id && (
                    <>
                        <Words dictionaryId={Number(id)} />
                        <AddWord dictionaryId={Number(id)} />
                    </>
                )}
            </FullPageWhiteContainer>
        </div>
    )
}

export default DictionaryPage
