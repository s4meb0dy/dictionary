import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

type FullPageWhiteContainerProps = {
    children?: React.ReactNode
}

const FullPageWhiteContainer: React.FC<FullPageWhiteContainerProps> = ({
    children,
}) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )

    return (
        <div
            style={{ backgroundColor: secondaryColor }}
            className="min-h-[calc(100%-190px)] rounded-t-[30px] sm:rounded-t-[55px] shadow-primary px-[10px] sm:px-[20px] pt-[20px] pb-[80px] sm:pt-[30px] lg:pb-[20px] "
        >
            {children}
        </div>
    )
}

export default FullPageWhiteContainer
