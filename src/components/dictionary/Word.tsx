import React from 'react'
import Checkbox from '../input/Checkbox'
import Status from '../Status'

type WordProps = {
    name: string
    translation: string
    id: number
    isLearned: boolean
}

const Word: React.FC<WordProps> = ({ name, translation, id, isLearned }) => {
    return (
        <div className="bg-white p-[24px] mb-[10px] rounded-[25px] shadow-secondary flex justify-between relative">
            <div className="absolute top-[12px] right-[12px]">
                {isLearned ? (
                    <Status type="success" />
                ) : (
                    <Status type="warning" />
                )}
            </div>
            <div>
                <div className='flex items-center'>
                    <Checkbox
                        name={`select-word-${id}`}
                        id={`select-word-${id}`}
                    />
                    <div className='pl-[25px]'>
                        <p className="text-[24px] leading-[29px] text-black">
                            {name}
                        </p>
                        <p className="text-[20px] leading-[24px] text-black/50">
                            {translation}
                        </p>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Word
