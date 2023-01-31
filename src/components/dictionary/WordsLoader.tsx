import React from 'react'
import ContentLoader from 'react-content-loader'

type WordsLoaderProps = {
    number?: number
}

const WordsLoader: React.FC<WordsLoaderProps> = ({ number = 1 }) => {
    const count = Array(number).fill('1')

    return (
        <>
            {count.map((item, index) => (
                <ContentLoader
                    speed={2}
                    width={840}
                    height={101}
                    viewBox="0 0 840 101"
                    backgroundColor="#fff"
                    foregroundColor="#f3f3f3"
                    className="mb-[10px]"
                    key={index}
                >
                    <rect x="0" y="0" rx="25" ry="25" width="840" height="101" />
                </ContentLoader>
            ))}
        </>
    )
}

export default WordsLoader
