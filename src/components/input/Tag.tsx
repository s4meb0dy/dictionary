import React from 'react'

type TagProps = {
    name: string
    color: string
    outline?: boolean
}

const Tag: React.FC<TagProps> = ({ name, color, outline = false }) => {
    return (
        <div
            className={`rounded-full font-semibold text-[12px] leading-[16px] px-[5px] py-[1px] border select-none`}
            style={{
                color: outline ? color : 'white',
                backgroundColor: outline ? '' : color,
                borderColor: color,
            }}
        >
            {name}
        </div>
    )
}

export default Tag
