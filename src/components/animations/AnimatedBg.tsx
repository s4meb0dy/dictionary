import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { DeviceTypeEnum } from '../../types'
import Ball from './Ball'

type AnimatedBg = {
    children?: React.ReactNode
}

const AnimatedBg: React.FC<AnimatedBg> = ({ children }) => {
    const deviceType = useAppSelector((state) => state.app.deviceType)

    const [firstSize, setFirstSize] = React.useState('900px')
    const [secondSize, setSecondSize] = React.useState('905px')
    const [thirdSize, setThirdSize] = React.useState('910px')

    React.useEffect(() => {
        switch (deviceType) {
            case DeviceTypeEnum.Mobile:
                setFirstSize('300px')
                setSecondSize('305px')
                setThirdSize('310px')
                break
            case DeviceTypeEnum.Tablet:
                setFirstSize('700px')
                setSecondSize('705px')
                setThirdSize('710px')
                break
            case DeviceTypeEnum.Desktop:
                setFirstSize('900px')
                setSecondSize('905px')
                setThirdSize('910px')
                break
        }
    }, [deviceType])

    return (
        <div className="bg-primaryBg w-full h-full overflow-x-hidden relative">
            <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
                <Ball
                    width={thirdSize}
                    height={thirdSize}
                    styles="absolute bottom-[60%] right-[-15%] animate-swimRB bg-gray/30"
                />

                <Ball
                    width={firstSize}
                    height={firstSize}
                    styles="absolute bottom-[60%] right-[-15%] animate-swimLB bg-gray/50"
                />

                <Ball
                    width={firstSize}
                    height={firstSize}
                    styles="absolute top-[70%] left-[-10%] animate-swimLU bg-gray/50"
                />

                <Ball
                    width={secondSize}
                    height={secondSize}
                    styles="absolute top-[70%] left-[-10%] animate-swimLB bg-gray/40"
                />
            </div>
            {children && (
                <div className="relative h-full w-full z-20">{children}</div>
            )}
            {/* <div className="absolute top-0 left-0 h-full w-full">

            </div> */}
        </div>
    )
}

export default AnimatedBg
