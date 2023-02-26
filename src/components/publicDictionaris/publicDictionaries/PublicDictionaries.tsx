import React from 'react'
import { useInView } from 'react-intersection-observer'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { dictionaryApi } from '../../../redux/services/dictionaryApi'
import { IDictionary } from '../../../types/models'
import PublicDictionary from './PublicDictionary'
import PublicDictionaryLoader from './PublicDictionaryLoader'

const PublicDictionaries: React.FC = () => {
    const [page, setPage] = React.useState(1)

    const { ref, inView } = useInView({
        threshold: 0,
    })

    const { data, isLoading, error, isError } =
        dictionaryApi.useGetAllPublicDictionariesQuery(page, {
            // refetchOnMountOrArgChange: true,
        })
    const [dictionaries, setDictionaries] = React.useState<IDictionary[]>([])

    React.useEffect(() => {
        if (inView && data?.pages) {
            setPage((prev) => (data?.pages != prev ? prev + 1 : prev))
        }
    }, [inView, data])

    React.useEffect(() => {
        if (data)
            setDictionaries((prevDictionaries) => [
                ...prevDictionaries,
                ...data.dictionaries,
            ])
    }, [data])

    useErrorHandler(error as string)

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="animate-appearance">
            {!isLoading &&
                dictionaries.map((item) => (
                    <PublicDictionary
                        key={item.id}
                        name={item.name}
                        words={item.total}
                        id={item.id}
                    />
                ))}

            {isLoading && <PublicDictionaryLoader number={5} />}
            <div ref={ref} />
        </div>
    )
}

export default PublicDictionaries
