import React from 'react'
type RadioProps = {
    id: string
    name: string
    children?: React.ReactNode
    afterLabel?: boolean
    beforeLabel?: boolean
    styles?: string
    defaultChecked?: boolean
    value: boolean
    onChange: (trueId: string) => void
}

const Radio: React.FC<RadioProps> = ({
    id,
    name,
    beforeLabel,
    afterLabel,
    children,
    styles,
    defaultChecked,
    value,
    onChange,
}) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) onChange(id)
    }

    return (
        <span className={`flex items-center ${styles && styles}`}>
            {beforeLabel && children && (
                <label htmlFor={id} className="mr-[7px] cursor-pointer">
                    {children}
                </label>
            )}
            <div className="border-[2px] rounded-full border-white w-[25px] h-[25px] flex justify-center items-center">
                <input
                    id={id}
                    name={name}
                    type="radio"
                    defaultChecked={defaultChecked}
                    checked={value}
                    className="checkbox appearance-none transition-colors checked:bg-white rounded-full outline-none cursor-pointer w-[17px] h-[17px]"
                    onChange={onChangeHandler}
                />
            </div>
            {afterLabel && children && (
                <label htmlFor={id} className="ml-[7px] cursor-pointer">
                    {children}
                </label>
            )}
        </span>
    )
}

export default Radio
