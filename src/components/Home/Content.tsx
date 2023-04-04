import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

interface ContentProps {
    children?: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )
    return (
        <div
            style={{ backgroundColor: secondaryColor }}
            className="w-full flex-auto py-[40px] lg:py-[60px] rounded-t-[30px] sm:rounded-t-[40px] shadow-primary"
        >
            {children}
        </div>
    )
}

export default Content
