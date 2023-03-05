import React from 'react'
import { useParams } from 'react-router-dom'

import AddWord from '../../components/myDictionaries/myDictionary/AddWord'
import MyDictionaryInformation from '../../components/myDictionaries/myDictionary/MyDictionaryInformation'
import Words from '../../components/myDictionaries/myDictionary/Words'
import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useErrorHandler from '../../hooks/useErrorHandler'
import { deleteWordsToStudy, setTotalInformationAboutDictionary } from '../../redux/features'

import { dictionaryApi } from '../../redux/services/dictionaryApi'

const DictionaryPage: React.FC = () => {
    const { id, name, access } = useParams()

    const dispatch = useAppDispatch()

    const [page, setPage] = React.useState(1)

    const { data, error, isLoading } =
        dictionaryApi.useGetWordsFromMyDictionaryQuery(
            { page, dictionaryId: Number(id) },
        )

    React.useEffect(() => {
        if (data) dispatch(setTotalInformationAboutDictionary(data))
    }, [data])

    useErrorHandler(error as string)

    React.useEffect(() => {
        return () => {
            // dispatch(clearWords())
            dispatch(deleteWordsToStudy([]))
        }
    }, [])

    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage>
                {id && name && access && (
                    <MyDictionaryInformation
                        dictionaryName={name}
                        access={access}
                        isLoading={isLoading}
                    />
                )}
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                {id && (
                    <>
                        <Words
                            dictionaryId={Number(id)}
                            words={data?.words}
                            isLoading={isLoading}
                        />
                        <AddWord dictionaryId={Number(id)} />
                    </>
                )}
            </FullPageWhiteContainer>
        </div>
    )
}

export default DictionaryPage
