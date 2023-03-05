import React from 'react'

interface WordProps {
    name: string
    translation: string
    id: number
}

const Word: React.FC<WordProps> = ({ name, translation, id }) => {
    return (
        <div className='h-[100px] w-[50%] px-[10px] mb-[20px]'>
            <div className="h-full w-full bg-white shadow-secondary rounded-[25px] flex flex-col justify-center items-center p-[10px]">
                <p className="text-black text-[24px] leading-[29px]">{name}</p>
                <p className="text-black/50 text-[20px] leading-[24px]">
                    {translation}
                </p>
            </div>
        </div>
    )
}

export default Word
