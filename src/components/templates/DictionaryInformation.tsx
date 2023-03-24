import React from 'react'
import ContentLoader from 'react-content-loader'
import { useAppSelector } from '../../hooks/reduxHooks'

interface DictionaryInformationProps {
    isLoading: boolean
    title: string
    firstSubtitle?: string
    secondSubtitle?: string
    children?: React.ReactNode
}

const DictionaryInformation: React.FC<DictionaryInformationProps> = ({
    isLoading,
    title,
    firstSubtitle,
    secondSubtitle,
    children,
}) => {
    const deviceType = useAppSelector((state) => state.app.deviceType)

    let loaderHeight = deviceType !== 'Mobile' ? 40 : 32

    if (firstSubtitle) loaderHeight += deviceType !== 'Mobile' ? 30 : 28
    if (secondSubtitle) loaderHeight += deviceType !== 'Mobile' ? 21 : 19

    return (
        <div>
            {!isLoading ? (
                <div className="relative">
                    <h1 className="text-white tracking-wide backdrop:font-medium text-[32px] sm:text-[40px] pb-[12px] leading-none">
                        {title}
                    </h1>
                    {firstSubtitle && (
                        <h3 className="text-white tracking-wide text-[16px] sm:text-[18px] pb-[5px] leading-none">
                            {firstSubtitle}
                        </h3>
                    )}
                    {secondSubtitle && (
                        <h4 className="text-white tracking-wide text-[14px] sm:text-[16px] leading-none">
                            {secondSubtitle}
                        </h4>
                    )}
                    {children && children}
                </div>
            ) : (
                <ContentLoader
                    speed={2}
                    width={200}
                    height={loaderHeight}
                    viewBox={`0 0 200 ${loaderHeight}`}
                    backgroundColor="#257bc4"
                    foregroundColor="#0D6CBD"
                >
                    <rect
                        x="0"
                        y="0"
                        rx="5"
                        ry="5"
                        width="200"
                        height={deviceType !== 'Mobile' ? '40' : '32'}
                    />
                    {firstSubtitle && (
                        <rect
                            x="0"
                            y={deviceType !== 'Mobile' ? '52' : '44'}
                            rx="5"
                            ry="5"
                            width="195"
                            height={deviceType !== 'Mobile' ? '18' : '16'}
                        />
                    )}
                    {secondSubtitle && (
                        <rect
                            x="0"
                            y={deviceType !== 'Mobile' ? '75' : '65'}
                            rx="5"
                            ry="5"
                            width="150"
                            height={deviceType !== 'Mobile' ? '16' : '14'}
                        />
                    )}
                </ContentLoader>
            )}
        </div>
    )
}

export default DictionaryInformation
