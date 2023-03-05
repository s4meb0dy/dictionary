import React from 'react'

import TotalInformation from '../../components/myDictionaries/myDictionaries/TotalInformation'
import MyDictionaries from '../../components/myDictionaries/myDictionaries/MyDictionaries'
import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'

const MyDictionariesPage = () => {
    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage>
                <TotalInformation />
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                <MyDictionaries />
            </FullPageWhiteContainer>
        </div>
    )
}

export default MyDictionariesPage
