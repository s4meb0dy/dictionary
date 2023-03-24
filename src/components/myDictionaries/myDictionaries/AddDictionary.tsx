import React from 'react'
import PluseIcon from '../../../assets/icons/PluseIcon'

type AddDictionaryProps = {
    onClick: () => void
}

const AddDictionary: React.FC<AddDictionaryProps> = ({ onClick }) => {
    return (
        <div className="h-[160px] w-[50%] px-[5px] sm:px-[10px] mb-[10px]">
            <div
                onClick={onClick}
                className="h-full w-full bg-white shadow-secondary rounded-[15px] flex justify-center items-center mb-[20px] cursor-pointer"
            >
                <PluseIcon width="55px" height="55px" color="#0D6CBD" />
            </div>
        </div>
    )
}

export default AddDictionary
