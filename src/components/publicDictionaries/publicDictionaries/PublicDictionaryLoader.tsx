import React from 'react'
import ContentLoader from 'react-content-loader'

type PublicDictionaryLoaderProps = {
    number?: number
}

const PublicDictionaryLoader: React.FC<PublicDictionaryLoaderProps> = ({
    number = 1,
}) => {
    const count = Array(number).fill('1')

    return (
        <>
            {count.map((item, index) => (
                <ContentLoader
                    speed={2}
                    width={900}
                    height={87}
                    viewBox="0 0 900 87"
                    backgroundColor="#257bc4"
                    foregroundColor="#0D6CBD"
                    className="mt-[13px]"
                    key={index}
                >
                    <rect x="0" y="0" rx="20" ry="20" width="900" height="87" />
                </ContentLoader>
            ))}
        </>
    )
}

export default PublicDictionaryLoader
