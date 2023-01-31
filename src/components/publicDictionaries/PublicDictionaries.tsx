import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDictionariesByOtherUsers } from '../../redux/features/dictionarySlice'
import PublicDictionary from './PublicDictionary'
import PublicDictionaryLoader from './PublicDictionaryLoader'

const PublicDictionaries: React.FC = () => {
    const { isLoading, dictionaries } = useAppSelector(
        (state) => state.dictionary
    )
    const dispatch = useAppDispatch()
    const [fetching, setFetching] = React.useState<boolean>(false)

    const scrollHandler = React.useCallback((e: any) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            100
        )
            setFetching(true)
    }, [])

    React.useEffect(() => {
        if (fetching)
            dispatch(fetchDictionariesByOtherUsers()).finally(() => {
                setFetching(false)
            })
    }, [fetching])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchDictionariesByOtherUsers())

        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <div className="animate-appearance">
            {!isLoading &&
                dictionaries.dictionaries.length > 0 &&
                dictionaries.dictionaries.map((item) => (
                    <PublicDictionary
                        key={item.id}
                        name={item.name}
                        words={item.total}
                        id={1}
                    />
                ))}
            {isLoading && <PublicDictionaryLoader number={5} />}
        </div>
    )
}

export default PublicDictionaries
