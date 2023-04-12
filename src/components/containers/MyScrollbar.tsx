import React from 'react'
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars'

interface MyScrollbarProps extends ScrollbarProps {
    children: React.ReactNode
}
const MyScrollbar: React.FC<MyScrollbarProps> = ({ children }) => {
    return (
        <Scrollbars style={{ width: '100%', height: '100%' }}>
            {children}
        </Scrollbars>
    )
}

export default MyScrollbar
