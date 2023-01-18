import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

const Information: React.FC = () => {

    

    return (
        <div className="h-[190px] text-white tracking-wide">
            <h3 className="font-medium text-[40px] pb-[12px] leading-[50px]">
                28 words
            </h3>
            <p className="text-[20px] leading-[25px]">10 studied words</p>
            <p className="text-[18px] leading-[23px]">3 dictionaries</p>
        </div>
    )
}

export default Information
