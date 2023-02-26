import React from 'react'
import PluseIcon from '../../../assets/icons/PluseIcon'

type AddDictionaryProps = {
    onClick: () => void
}

const AddDictionary: React.FC<AddDictionaryProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="h-[160px] w-[410px] bg-white shadow-secondary rounded-[15px] flex justify-center items-center mb-[20px] cursor-pointer"
        >
            <PluseIcon width="55px" height="55px" color="#0D6CBD" />
        </div>
    )
}

export default AddDictionary
