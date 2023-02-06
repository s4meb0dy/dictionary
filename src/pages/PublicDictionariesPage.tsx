import React from 'react'
import PublicDictionaries from '../components/publicDictionaries/PublicDictionaries'
import SearchBlock from '../components/publicDictionaries/SearchBlock'

const PublicDictionariesPage: React.FC = () => {
    return (
        <div className="pb-[40px] animate-appearance">
            <SearchBlock />
            <PublicDictionaries />
        </div>
    )
}

export default PublicDictionariesPage
