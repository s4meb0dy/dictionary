import React from 'react'
import { useInView } from 'react-intersection-observer'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import { IDictionary } from '../../../types/models'
import PublicDictionary from './PublicDictionary'
import PublicDictionaryLoader from './PublicDictionaryLoader'
import SearchBlock from './SearchBlock'

const PublicDictionaries: React.FC = () => {
    const [queryData, setQueryData] = React.useState<{
        page: number
        name: string
    }>({ page: 1, name: '' })

    const [dataFromApi, setDataFromApi] = React.useState<{
        dictionaries: IDictionary[]
        pages: number
    }>({
        dictionaries: [],
        pages: 1,
    })

    const { ref, inView = false } = useInView({
        threshold: 0,
    })

    const { data, isLoading, error } =
        dictionaryApi.useGetAllPublicDictionariesQuery({
            page: queryData.page,
            name: queryData.name,
        })

    React.useEffect(() => {
        if (inView && !isLoading) {
            setQueryData((prev) => ({
                page: prev.page < dataFromApi.pages ? prev.page + 1 : prev.page,
                name: prev.name,
            }))
        }
    }, [inView, isLoading])

    React.useEffect(() => {
        if (data) {
            setDataFromApi((prevData) => ({
                pages: data.pages,
                dictionaries: [...prevData.dictionaries, ...data.dictionaries],
            }))
        }
    }, [data])

    const searchingDictionary = React.useCallback((value: string) => {
        setDataFromApi({ dictionaries: [], pages: 1 })
        setQueryData({ page: 1, name: value })
    }, [])

    useErrorHandler(React.useMemo(() => error as string, [error]))

    React.useEffect(() => {
        window.scrollTo(0, 0)
        return () => {
            setDataFromApi({ dictionaries: [], pages: 1 })
            setQueryData({ name: '', page: 1 })
        }
    }, [])

    return (
        <>
            <SearchBlock onSearch={searchingDictionary} />
            <div className="pb-[80px] sm:pb-[40px] animate-appearance">
                {!isLoading &&
                    dataFromApi.dictionaries.map((item, index) => (
                        <div key={item.id}>
                            <PublicDictionary
                                name={item.name}
                                words={1}
                                id={item.id}
                            />
                            {index === dataFromApi.dictionaries.length - 1 && (
                                <div key={item.id + index} ref={ref} />
                            )}
                        </div>
                    ))}
                {isLoading && <PublicDictionaryLoader number={10} />}
            </div>
        </>
    )
}

export default PublicDictionaries
