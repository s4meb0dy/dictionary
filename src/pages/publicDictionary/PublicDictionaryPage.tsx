import React from 'react'
import { useParams } from 'react-router-dom'
import PublicDictionaryHeader from '../../components/publicDictionaries/publicDictionary/PublicDictionaryHeader'

import Words from '../../components/publicDictionaries/publicDictionary/Words'

import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'
import useErrorHandler from '../../hooks/useErrorHandler'
import { dictionaryApi } from '../../redux/services'

type PublicDictionaryPageProps = {}

const PublicDictionaryPage: React.FC<PublicDictionaryPageProps> = () => {
    const { id, name } = useParams()
    const [page, setPage] = React.useState(1)

    const { data, isLoading, error } =
        dictionaryApi.useGetWordsFromPublicDictionaryQuery({
            page,
            dictionaryId: id ? id : 'undefined',
        })

    useErrorHandler(error as string)

    return (
        <div className="w-full max-w-[900px]  h-full mx-auto pt-[40px] animate-appearance">
            <HeaderUnderFullPage>
                <PublicDictionaryHeader
                    dictionaryId={Number(id) || 0}
                    dictionaryName={name || 'Dictionary'}
                    isLoading={isLoading}
                    totalWords={data?.count || 0}
                />
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                {id && data && <Words words={data.words} />}
            </FullPageWhiteContainer>
        </div>
    )
}

export default PublicDictionaryPage
