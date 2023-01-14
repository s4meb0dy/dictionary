import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Home from '../../pages/Home'
import { AuthorizationEnum } from '../../types'

type HomeContainerProps = {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    if (authorizationStatus === AuthorizationEnum.Login) return <div>
        <Home />
    </div>
    else return <div>page fot not authorized</div>
}

export default HomeContainer
