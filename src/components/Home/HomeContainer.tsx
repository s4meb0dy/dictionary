import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import HomePage from '../../pages/home/HomePage'
import MyDictionariesPage from '../../pages/myDictionary/MyDictionariesPage'
import { AuthorizationEnum } from '../../types'

type HomeContainerProps = {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    if (authorizationStatus === AuthorizationEnum.Login) return <MyDictionariesPage />
    else return <HomePage />
}

export default HomeContainer
