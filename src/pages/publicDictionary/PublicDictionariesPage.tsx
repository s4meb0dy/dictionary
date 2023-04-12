import React from 'react'
import PublicDictionaries from '../../components/publicDictionaries/publicDictionaries/PublicDictionaries'
import PageContainer from '../../components/containers/PageContainer'
import { useAppSelector } from '../../hooks/reduxHooks'
import { AuthorizationEnum } from '../../types'

const PublicDictionariesPage: React.FC = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    return (
        <PageContainer
            withNavbar={authorizationStatus === AuthorizationEnum.Login}
        >
            <main className="w-full max-w-[920px] px-[10px] h-full mx-auto pt-[40px] animate-appearance">
                <PublicDictionaries />
            </main>
        </PageContainer>
    )
}

export default PublicDictionariesPage
