import React from 'react'
import ContentLoader from 'react-content-loader'
import { useAppSelector } from '../../hooks/reduxHooks'

const DictionaryInformation: React.FC = () => {
    const { isLoading } = useAppSelector((state) => state.dictionary)

    return (
        <>
            {!isLoading ? (
                <>
                    <h3 className="text-white tracking-wide backdrop:font-medium text-[40px] pb-[12px] leading-[50px]">
                        28 words
                    </h3>
                    <p className="text-white tracking-wide backdrop:text-[20px] leading-[25px]">
                        10 studied words
                    </p>
                    <p className="text-white tracking-wide backdrop:text-[18px] leading-[23px]">
                        3 dictionaries
                    </p>
                </>
            ) : (
                <ContentLoader
                    speed={2}
                    width={200}
                    height={130}
                    viewBox="0 0 200 110"
                    backgroundColor="#257bc4"
                    foregroundColor="#0D6CBD"
                >
                    <rect x="0" y="83" rx="5" ry="5" width="150" height="17" />
                    <rect x="0" y="0" rx="5" ry="5" width="200" height="40" />
                    <rect x="0" y="58" rx="5" ry="5" width="195" height="19" />
                </ContentLoader>
            )}
        </>
    )
}

export default DictionaryInformation
