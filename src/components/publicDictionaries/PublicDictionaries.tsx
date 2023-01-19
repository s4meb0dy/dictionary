import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import PublicDictionary from './PublicDictionary'
import PublicDictionaryLoader from './PublicDictionaryLoader'

const PublicDictionaries: React.FC = () => {
    const { dictionaries, isLoading } = useAppSelector(
        (state) => state.dictionary
    )

    return (
        <div className="animate-appearance">
            {!isLoading && dictionaries.length > 0 &&
                dictionaries.map((item) => (
                    <PublicDictionary
                        key={item.id}
                        name={item.name}
                        words={item.words.length}
                        id={1}
                    />
                ))}
            {isLoading && <PublicDictionaryLoader number={5} />}
        </div>
    )
}

export default PublicDictionaries
