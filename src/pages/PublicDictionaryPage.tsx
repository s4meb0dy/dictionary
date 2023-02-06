import React from 'react'
import { useParams } from 'react-router-dom'
import FullPageWhiteContainer from '../components/pageContainers/FullPageWhiteContainer'
import HeaderUnderFullPage from '../components/pageContainers/HeaderUnderFullPage'
import { useAppDispatch } from '../hooks/reduxHooks'
import {
    clearWords,
    fetchWordsFromDictionary,
} from '../redux/features/wordSlice'

type PublicDictionaryPageProps = {}

const PublicDictionaryPage: React.FC<PublicDictionaryPageProps> = () => {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (id) dispatch(fetchWordsFromDictionary(Number(id)))
        return () => {
            dispatch(clearWords())
        }
    }, [id])

    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage></HeaderUnderFullPage>
            <FullPageWhiteContainer></FullPageWhiteContainer>
        </div>
    )
}

export default PublicDictionaryPage
