import React from 'react'
import Navbar from '../navigation/Navbar'
import { useAppSelector } from '../../hooks/reduxHooks'

interface PageContainerProps {
    withNavbar?: boolean
    children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({
    children,
    withNavbar = false,
}) => {
    return (
        <>
            {withNavbar && <Navbar />}
            {children}
        </>
    )
}

export default PageContainer
