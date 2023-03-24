import React from 'react'

import MyDictionariesHeader from '../../components/myDictionaries/myDictionaries/MyDictionariesHeader'
import MyDictionaries from '../../components/myDictionaries/myDictionaries/MyDictionaries'
import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'

const MyDictionariesPage = () => {
    return (
        <div className="w-full max-w-[900px] h-full mx-auto pt-[40px] animate-appearance">
            <HeaderUnderFullPage>
                <MyDictionariesHeader />
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                <MyDictionaries />
            </FullPageWhiteContainer>
        </div>
    )
}

export default MyDictionariesPage
