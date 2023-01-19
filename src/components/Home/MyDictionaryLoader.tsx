import React from 'react'
import ContentLoader from 'react-content-loader'

type MyDictionaryLoaderProps = {
    number?: number
}

const MyDictionaryLoader: React.FC<MyDictionaryLoaderProps> = ({
    number = 1,
}) => {
    const count = Array(number).fill('1')

    return (
        <>
            {count.map((item, index) => (
                <ContentLoader
                    speed={2}
                    width={410}
                    height={160}
                    viewBox="0 0 410 160"
                    backgroundColor="#fff"
                    foregroundColor="#f3f3f3"
                    key={index}
                    style={{marginBottom: '20px'}}
                >
                    <rect
                        x="0"
                        y="0"
                        rx="15"
                        ry="15"
                        width="410"
                        height="160"
                    />
                </ContentLoader>
            ))}
        </>
    )
}

export default MyDictionaryLoader
