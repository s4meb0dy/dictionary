import React from 'react'
import Tag from '../Tag'

type MyDictionaryProps = {
    name: string
    words: number
    learnedWords: number
    access: 'private' | 'public'
    id: number
    onClick: (data: {id: number, name: string, access: 'private' | 'public'}) => void
}

const MyDictionary: React.FC<MyDictionaryProps> = ({
    name,
    words,
    learnedWords,
    access,
    id,
    onClick,
}) => {
    const onClickHandler = () => {
        onClick({ id, name, access })
    }

    return (
        <div
            onClick={onClickHandler}
            className="h-[160px] w-[410px] bg-white shadow-secondary rounded-[15px] relative flex justify-center items-center mb-[20px] cursor-pointer"
        >
            <span className="absolute top-[7px] left-[7px]">
                {access === 'public' ? (
                    <Tag name="Public" color="#C89600" outline />
                ) : (
                    <Tag name="Private" color="#00AEBF" outline />
                )}
            </span>
            <div className="pt-[32px] flex flex-col items-center tracking-wide">
                <h4 className="font-medium text-[24px] leading-[24px] color-black  pb-[8px]">
                    {name}
                </h4>
                <p className="text-[15px] leading-[15px] text-black/40 pb-[2px] select-none">
                    {`${words} words`}
                </p>
                <p className="text-[15px] leading-[15px] text-black/40 select-none">
                    {`${learnedWords} learned`}
                </p>
            </div>
        </div>
    )
}

export default MyDictionary
