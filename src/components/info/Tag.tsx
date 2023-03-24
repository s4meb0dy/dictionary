import classNames from 'classnames'
import React from 'react'

type TagProps = {
    name: string
    color: string
    outline?: boolean
    size?: 'medium' | 'large'
}

const Tag: React.FC<TagProps> = ({
    name,
    color,
    outline = false,
    size = 'medium',
}) => {
    const sizeStyle = classNames({ 'text-[12px] px-[5px] py-[1px]': size === 'medium' }, { 'text-[14px] px-[7px] py-[3px]': size === 'large' })

    return (
        <div
            className={`rounded-full font-semibold leading-[16px] border select-none ${sizeStyle}`}
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
