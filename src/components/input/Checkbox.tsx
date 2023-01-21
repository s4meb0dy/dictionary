import React from 'react'
type CheckboxProps = {
    id: string
    name: string
    styles?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, styles }) => {
    return (
        <span className={`flex items-center ${styles && styles}`}>
            <label htmlFor={id}>
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    className="appearance-none w-[25px] h-[25px] border-2 border-[#CDD5DE] rounded-[4px]"
                />
            </label>
        </span>
    )
}

export default Checkbox
