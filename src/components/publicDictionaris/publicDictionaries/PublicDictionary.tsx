import React from 'react'
import { useNavigate } from 'react-router-dom'

type SearchBlockProps = {
    name: string
    words: number
    id: number
}

const PublicDictionary: React.FC<SearchBlockProps> = ({ name, words, id }) => {
    const navigate = useNavigate()

    const onOpenDictionary = () => {
        navigate(`/dictionary/${id}/${name}`)
    }

    return (
        <div
            onClick={onOpenDictionary}
            className="px-[35px] mt-[13px] py-[27px] bg-secondaryBg shadow-primary rounded-[20px] flex justify-between cursor-pointer"
        >
            <h4 className="font-medium text-[22px] tracking-wide text-black">
                {name}
            </h4>
            <p className="font-medium text-[20px] tracking-wide text-black/40">{`${words} words`}</p>
        </div>
    )
}

export default PublicDictionary
