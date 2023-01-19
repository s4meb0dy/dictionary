import React from 'react'

type HeaderUnderFullPageProps = {
    children?: React.ReactNode
}

const HeaderUnderFullPage: React.FC<
    HeaderUnderFullPageProps
> = ({ children }) => {
    return <div className="h-[190px]">{children}</div>
}

export default HeaderUnderFullPage
