import React from 'react'

type FullPageWhiteContainerProps = {
    children?: React.ReactNode
}

const FullPageWhiteContainer: React.FC<FullPageWhiteContainerProps> = ({
    children,
}) => {
    return (
        <div className="min-h-[calc(100%-190px)] bg-secondaryBg rounded-t-[55px] shadow-primary p-[30px] ">
            {children}
        </div>
    )
}

export default FullPageWhiteContainer
