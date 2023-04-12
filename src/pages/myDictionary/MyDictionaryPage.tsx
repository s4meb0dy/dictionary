import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'

import AddWord from '../../components/myDictionaries/myDictionary/AddWord'
import MyDictionaryHeader from '../../components/myDictionaries/myDictionary/MyDictionaryHeader'
import Words from '../../components/myDictionaries/myDictionary/Words'
import FullPageWhiteContainer from '../../components/containers/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/containers/HeaderUnderFullPage'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useErrorHandler from '../../hooks/useErrorHandler'
import {
    deleteWordToStudy,
    setTotalInformationAboutMyDictionary,
} from '../../redux/features'

import { dictionaryApi } from '../../redux/services/dictionaryApi'
import { IWord } from '../../types/models'
import Navbar from '../../components/navigation/Navbar'
import PageContainer from '../../components/containers/PageContainer'

const DictionaryPage: React.FC = () => {
    const { id, name, access } = useParams()

    const dispatch = useAppDispatch()

    const [queryData, setQueryData] = React.useState<{
        page: number
    }>({ page: 1 })

    const [dataFromApi, setDataFromApi] = React.useState<{
        words: IWord[]
        pages: number
    }>({
        words: [],
        pages: 1,
    })

    const { data, error, isLoading } =
        dictionaryApi.useGetWordsFromMyDictionaryQuery({
            page: queryData.page,
            dictionaryId: Number(id),
        })

    React.useEffect(() => {
        if (data) dispatch(setTotalInformationAboutMyDictionary(data))
    }, [data])

    const { ref, inView } = useInView({
        threshold: 0,
    })

    React.useEffect(() => {
        if (inView && !isLoading) {
            setQueryData((prev) => ({
                page: prev.page < dataFromApi.pages ? prev.page + 1 : prev.page,
            }))
        }
    }, [inView, isLoading])

    React.useEffect(() => {
        if (data) {
            setDataFromApi((prevData) => ({
                pages: data.pages,
                words: [...prevData.words, ...data.words],
            }))
        }
    }, [data])

    useErrorHandler(error as string)

    React.useEffect(() => {
        dispatch(deleteWordToStudy())
        return () => {
            setDataFromApi({ words: [], pages: 1 })
            setQueryData({ page: 1 })
        }
    }, [])

    return (
        <PageContainer withNavbar>
            <div className="w-full max-w-[900px] h-full mx-auto pt-[40px]  animate-appearance">
                <HeaderUnderFullPage>
                    {id && name && access && (
                        <MyDictionaryHeader
                            dictionaryName={name}
                            access={access}
                            isLoading={isLoading}
                        />
                    )}
                </HeaderUnderFullPage>
                <FullPageWhiteContainer>
                    <main>
                        {id && (
                            <ul className="px-[5px] sm:px-[10px]">
                                <Words
                                    dictionaryId={Number(id)}
                                    words={dataFromApi.words}
                                    isLoading={isLoading}
                                />
                                <div ref={ref} />
                                <AddWord dictionaryId={Number(id)} />
                            </ul>
                        )}
                    </main>
                </FullPageWhiteContainer>
            </div>
        </PageContainer>
    )
}

export default DictionaryPage
