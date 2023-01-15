import React from 'react'
type RadioProps = {
    id: string
    name: string
    children?: React.ReactNode
    afterLabel?: boolean
    beforeLabel?: boolean
    styles?: string
}

const Radio: React.FC<RadioProps> = ({
    id,
    name,
    beforeLabel,
    afterLabel,
    children,
    styles,
}) => {
    return (
        <span className={`inline-block flex items-center ${styles && styles}`}>
            {beforeLabel && children && (
                <label htmlFor={id} className="mr-[7px]">
                    {children}
                </label>
            )}
            <div className="border-[2px] rounded-full border-white w-[25px] h-[25px] flex flex-shrink-0 justify-center items-center relative">
                <input
                    id={id}
                    name={name}
                    type="radio"
                   
                    className="checkbox appearance-none checked:bg-white rounded-full outline-none absolute cursor-pointer w-[19px] h-[19px] top-0 left-0"
                />
            </div>
            {afterLabel && children && (
                <label htmlFor={id} className="ml-[7px]">
                    {children}
                </label>
            )}
        </span>
    )
}

export default Radio
