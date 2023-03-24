import React from 'react'
import PublicDictionaries from '../../components/publicDictionaries/publicDictionaries/PublicDictionaries'


const PublicDictionariesPage: React.FC = () => {
    return (
        <main className="w-full max-w-[920px] px-[10px] h-full mx-auto pt-[40px] animate-appearance">
            <PublicDictionaries />
        </main>
    )
}

export default PublicDictionariesPage
