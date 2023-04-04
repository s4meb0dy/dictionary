import React from 'react'
import { useNavigate } from 'react-router-dom'

import Tag from '../../info/Tag'

type MyDictionaryProps = {
    name: string
    words: number
    learnedWords: number
    access: 'private' | 'public'
    id?: number
    width?: string
}

const MyDictionary: React.FC<MyDictionaryProps> = ({
    name,
    words,
    learnedWords,
    access,
    id,
    width,
}) => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (id) navigate(`/my-dictionary/${id}/${access}/${name}`)

        // onClick({ id, name, access })
    }

    return (
        <div
            className={`h-[160px] ${
                !width ? 'w-[50%]' : ''
            } px-[5px] sm:px-[10px] mb-[10px]`}
        >
            <div
                onClick={onClickHandler}
                style={{ width: width ? width : '100%' }}
                className={`h-full bg-white shadow-secondary rounded-[15px] relative flex justify-center items-center ${
                    id ? 'cursor-pointer' : ''
                } `}
            >
                <span className="absolute top-[7px] left-[7px]">
                    {access === 'public' ? (
                        <Tag
                            name="Public"
                            color="#C89600"
                            size="medium"
                            outline
                        />
                    ) : (
                        <Tag
                            name="Private"
                            color="#00AEBF"
                            size="medium"
                            outline
                        />
                    )}
                </span>
                <div className="pt-[34px] sm:pt-[38px] flex flex-col items-center tracking-wide px-[10px]">
                    <h3 className="text-center font-medium text-[20px] leading-6 sm: sm:text-[24px] sm:leading-7 color-black pb-[8px]">
                        {name}
                    </h3>
                    <p className="text-[12px] sm:text-[15px] leading-none text-black/40 pb-[2px] select-none">
                        {`${words} words`}
                    </p>
                    <p className="text-[12px] sm:text-[15px] leading-none text-black/40 select-none">
                        {`${learnedWords} learned`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MyDictionary
