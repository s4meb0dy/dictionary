import React from 'react'
import TotalInformation from '../../components/Home/TotalInformation'
import MyDictionaries from '../../components/Home/MyDictionaries'
import FullPageWhiteContainer from '../../components/templates/FullPageWhiteContainer'
import HeaderUnderFullPage from '../../components/templates/HeaderUnderFullPage'

const HomePage = () => {
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

export default HomePage
