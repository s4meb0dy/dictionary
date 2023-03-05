import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import { AuthorizationEnum } from '../types'

interface WithAuthProps {
    authorizationStatus: AuthorizationEnum
}

export default function withAuth<WProps extends WithAuthProps>(
    WrappedComponent: React.ComponentType<WProps & WithAuthProps>
) {
    let WithAuth: React.FC<Omit<WProps, 'authorizationStatus'>> = (props) => {
        const authorizationStatus = useAppSelector(
            (state) => state.user.authorizationStatus
        )

        if (authorizationStatus === AuthorizationEnum.Logout)
            return <Navigate to={'/login'} />

        return <WrappedComponent {...(props as WProps)} />
    }



    return WithAuth
}
