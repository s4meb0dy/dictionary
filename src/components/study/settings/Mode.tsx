import React from 'react'
import InfoIcon from '../../../assets/icons/InfoIcon'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface ModeProps {
    name: string
    id: number
    onClick: (id: number) => void
}

const Mode: React.FC<ModeProps> = ({ name, onClick, id }) => {
    const onOpenInfo = () => {
        console.log('info')
    }

    return (
        <div className="w-[410px] h-[160px] relative ">
            <InfoIcon
                color="rgba(0, 0, 0, 0.3)"
                width="25px"
                height="25px"
                styles="absolute top-[10px] right-[10px] cursor-pointer"
                onClick={onOpenInfo}
            />
            <div
                onClick={() => onClick(id)}
                className="w-full h-full shadow-secondary rounded-[15px] cursor-pointer flex items-center overflow-hidden bg-white"
            >
                <div className="flex-auto text-center text-black text-[32px] font-[500] tracking-wide">
                    {name}
                </div>
            </div>
        </div>
    )
}

export default Mode
