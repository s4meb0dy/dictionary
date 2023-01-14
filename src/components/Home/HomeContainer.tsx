import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Home from '../../pages/HomePage'
import { AuthorizationEnum } from '../../types'

type HomeContainerProps = {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    if (authorizationStatus === AuthorizationEnum.Login) return <Home />
    else return <div>page fot not authorized</div>
}

export default HomeContainer
