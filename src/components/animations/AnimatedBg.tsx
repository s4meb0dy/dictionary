import React from 'react'
import Ball from './Ball'

type AnimatedBg = {
    children?: React.ReactNode
}

const AnimatedBg: React.FC<AnimatedBg> = ({ children }) => {
    return (
        <div className="bg-primaryBg w-full h-full overflow-x-hidden relative">
            <div className='fixed top-0 left-0 w-full h-screen z-10 pointer-events-none'>
                <Ball
                    width={'910px'}
                    height={'910px'}
                    styles="absolute top-[-60%] left-[63%] animate-swimRB bg-gray/30"
                />

                <Ball
                    width={'900px'}
                    height={'900px'}
                    styles="absolute top-[-60%] left-[63%] animate-swimLB bg-gray/50"
                />

                <Ball
                    width={'900px'}
                    height={'900px'}
                    styles="absolute top-[70%] left-[-10%] animate-swimLU bg-gray/50 "
                />

                <Ball
                    width={'905px'}
                    height={'905px'}
                    styles="absolute top-[70%] left-[-10%] animate-swimLB bg-gray/40"
                />
            </div>
            {children && <div className="relative h-full w-full z-20">{children}</div>}
            {/* <div className="absolute top-0 left-0 h-full w-full">

            </div> */}
        </div>
    )
}

export default AnimatedBg
