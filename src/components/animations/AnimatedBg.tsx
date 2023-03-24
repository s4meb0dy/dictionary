import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

import Ball from './Ball'

type AnimatedBg = {}

const AnimatedBg: React.FC<AnimatedBg> = () => {
    const deviceType = useAppSelector((state) => state.app.deviceType)
    const backgroundColor = useAppSelector(
        (state) => state.app.colors.primaryColor
    )

    const [firstSize, setFirstSize] = React.useState('900px')
    const [secondSize, setSecondSize] = React.useState('905px')
    const [thirdSize, setThirdSize] = React.useState('910px')

    React.useEffect(() => {
        switch (deviceType) {
            case 'Mobile':
                setFirstSize('300px')
                setSecondSize('305px')
                setThirdSize('310px')
                break
            case 'Tablet':
                setFirstSize('700px')
                setSecondSize('705px')
                setThirdSize('710px')
                break
            case 'Desktop':
                setFirstSize('900px')
                setSecondSize('905px')
                setThirdSize('910px')
                break
        }
    }, [deviceType])

    return (
        <div
            style={{ backgroundColor: backgroundColor }}
            className={`w-full h-full fixed top-0 left-0 -z-10 pointer-events-none transition-colors duration-300`}
        >
            <Ball
                width={thirdSize}
                height={thirdSize}
                styles="fixed bottom-[60%] right-[-15%] animate-swimRB bg-gray/30"
            />

            <Ball
                width={firstSize}
                height={firstSize}
                styles="fixed bottom-[60%] right-[-15%] animate-swimLB bg-gray/50"
            />

            <Ball
                width={firstSize}
                height={firstSize}
                styles="fixed top-[70%] left-[-10%] animate-swimLU bg-gray/50"
            />

            <Ball
                width={secondSize}
                height={secondSize}
                styles="fixed top-[70%] left-[-10%] animate-swimLB bg-gray/40"
            />
        </div>
    )
}

export default AnimatedBg
