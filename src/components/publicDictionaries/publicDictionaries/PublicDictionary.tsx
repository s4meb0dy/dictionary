import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'

type SearchBlockProps = {
    name: string
    words: number
    id: number
}

const PublicDictionary: React.FC<SearchBlockProps> = ({ name, words, id }) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )

    const navigate = useNavigate()

    const onOpenDictionary = () => {
        navigate(`/dictionary/${id}/${name}`)
    }

    return (
        <div
            style={{ backgroundColor: secondaryColor }}
            
            onClick={onOpenDictionary}
            className="px-[20px] sm:px-[35px] mt-[10px] sm:mt-[13px] py-[19px] sm:py-[27px] shadow-primary rounded-[15px] sm:rounded-[20px] flex justify-between items-center cursor-pointer"
        >
            <h4 className="font-medium text-[22px] tracking-wide text-black">
                {name}
            </h4>
            <p className="font-medium text-[16px] sm:text-[20px] tracking-wide text-black/40">{`${words} words`}</p>
        </div>
    )
}

export default PublicDictionary
