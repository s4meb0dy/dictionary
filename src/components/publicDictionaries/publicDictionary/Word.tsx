import React from 'react'

interface WordProps {
    name: string
    translation: string
    id: number
}

const Word: React.FC<WordProps> = ({ name, translation, id }) => {
    return (
        <div className="h-[100px] w-[50%] px-[5px] sm:px-[10px] mb-[10px]">
            <div className="h-full w-full bg-white shadow-secondary rounded-[15px] flex flex-col justify-center items-center p-[10px]">
                <p className="text-black text-center text-[20px] leading-6 sm: sm:text-[24px] sm:leading-[29px]">{name}</p>
                <p className="text-black/50 text-center text-[15px] sm:text-[20px] leading-[24px]">
                    {translation}
                </p>
            </div>
        </div>
    )
}

export default Word
