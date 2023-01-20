import React from 'react'

type HeaderUnderFullPageProps = {
    children?: React.ReactNode
}

const HeaderUnderFullPage: React.FC<
    HeaderUnderFullPageProps
> = ({ children }) => {
    return <div className="h-[190px] relative">{children}</div>
}

export default HeaderUnderFullPage
