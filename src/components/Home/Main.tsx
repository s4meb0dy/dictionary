import React from 'react'

interface MainProps {}

const Main: React.FC<MainProps> = () => {
    return (
        <div className="w-full h-[550px] flex justify-center items-center">
            <div className='text-center flex flex-col items-center'>
                <h1 className='text-white text-[55px] tracking-tight font-semibold'>Your dictionary!</h1>
                <p className="text-white/50 text-[25px] font-medium w-[350px]">Learn foreign words efficiently!</p>
            </div>
        </div>
    )
}

export default Main
