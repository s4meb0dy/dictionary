import React from 'react'
import Navbar from '../navigation/Navbar'
import { useAppSelector } from '../../hooks/reduxHooks'
import Menu from '../menu/Menu'


interface PageContainerProps {
    withNavbar?: boolean
    withMenu?: boolean
    children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({
    children,
    withNavbar = false,
    withMenu = false
}) => {
    return (
        <>
            {withMenu && <Menu />}
            {withNavbar && <Navbar />}
            {children}
        </>
    )
}

export default PageContainer
