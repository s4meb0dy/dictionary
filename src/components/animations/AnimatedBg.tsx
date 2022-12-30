import React from "react"
import Ball from "./Ball"

type AnimatedBg = {
    children?: React.ReactNode
}

const AnimatedBg: React.FC<AnimatedBg> = ({ children }) => {
    return (
        <div className='bg-primaryBg h-full w-full overflow-hidden relative'>
            {children && children}
            <div className='absolute top-[-60%] left-[60%] h-full'>
                <Ball width={'900px'} height={'900px'} />
            </div>
            <div className='absolute top-[70%] left-[-10%] h-full'>
                <Ball width={'900px'} height={'900px'} />
            </div>
            {/* <div className="absolute top-0 left-0 h-full w-full">

            </div> */}
        </div>
    )
}

export default AnimatedBg
