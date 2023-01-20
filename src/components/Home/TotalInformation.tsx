import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import ContentLoader from 'react-content-loader'

const TotalInformation: React.FC = () => {
    const { isLoading } = useAppSelector((state) => state.dictionary)
    const { totalDictionaries, totalLearnedWords, totalWords } = useAppSelector(
        (state) => state.dictionary.myDictionaries
    )

    return (
        <>
            {!isLoading ? (
                <>
                    <h3 className="text-white tracking-wide backdrop:font-medium text-[40px] pb-[12px] leading-[50px]">
                        {`${totalWords} words`}
                    </h3>
                    <p className="text-white tracking-wide backdrop:text-[20px] leading-[25px]">
                        {`${totalLearnedWords} studied words`}
                    </p>
                    <p className="text-white tracking-wide backdrop:text-[18px] leading-[23px]">
                        {`${totalDictionaries} dictionaries`}
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

export default TotalInformation
