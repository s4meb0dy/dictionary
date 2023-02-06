import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useLazyLoading from '../../hooks/useLazyLoading'
import { fetchAllPublicDictionaries } from '../../redux/features/dictionarySlice'
import PublicDictionary from './PublicDictionary'
import PublicDictionaryLoader from './PublicDictionaryLoader'

const PublicDictionaries: React.FC = () => {
    const { isLoading, allPublicDictionaries } = useAppSelector(
        (state) => state.dictionary
    )
    const dispatch = useAppDispatch()
    const lazyLoading = useLazyLoading()

    React.useEffect(() => {
        if (lazyLoading.fetching)
            dispatch(fetchAllPublicDictionaries()).finally(() => {
                lazyLoading.loaded()
            })
    }, [lazyLoading.fetching])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchAllPublicDictionaries())
    }, [])

    return (
        <div className="animate-appearance">
            {!isLoading &&
                allPublicDictionaries.dictionaries.length > 0 &&
                allPublicDictionaries.dictionaries.map((item) => (
                    <PublicDictionary
                        key={item.id}
                        name={item.name}
                        words={item.total}
                        id={item.id}
                    />
                ))}
            {isLoading && <PublicDictionaryLoader number={5} />}
        </div>
    )
}

export default PublicDictionaries
