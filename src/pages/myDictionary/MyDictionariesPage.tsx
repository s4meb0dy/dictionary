import React from 'react'

import MyDictionariesHeader from '../../components/myDictionaries/myDictionaries/MyDictionariesHeader'
import MyDictionaries from '../../components/myDictionaries/myDictionaries/MyDictionaries'
import FullPageWhiteContainer from '../../components/containers/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/containers/HeaderUnderFullPage'
import Navbar from '../../components/navigation/Navbar'
import PageContainer from '../../components/containers/PageContainer'

const MyDictionariesPage = () => {
    return (
        <PageContainer withNavbar>
            <div className="w-full max-w-[900px] h-full mx-auto pt-[40px] animate-appearance">
                <HeaderUnderFullPage>
                    <MyDictionariesHeader />
                </HeaderUnderFullPage>
                <FullPageWhiteContainer>
                    <MyDictionaries />
                </FullPageWhiteContainer>
            </div>
        </PageContainer>
    )
}

export default MyDictionariesPage
