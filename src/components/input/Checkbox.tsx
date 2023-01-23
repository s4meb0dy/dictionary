import React from 'react'
import CheckmarkIcon from '../../assets/icons/CheckmarkIcon'
type CheckboxProps = {
    id: string
    name: string
    styles?: string
    onSelect: (isChecked: boolean) => void
    isChecked: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, styles, onSelect, isChecked }) => {
    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelect(e.target.checked)
    }

    return (
        <span className={`flex items-center ${styles && styles}`}>
            <label htmlFor={id} className="cursor-pointer relative w-[25px] h-[25px]">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    className="appearance-none w-full h-full border-2 rounded-[4px] transition-colors"
                    onChange={onChangeHandler}
                    checked={isChecked}
                    style={{
                        backgroundColor: isChecked ? '#0086EA' : '',
                        borderColor: isChecked ? '#0086EA' : '#CDD5DE',
                    }}
                />
                <div
                    className="w-full h-full absolute top-[50%] left-[50%] -translate-x-[12.5px] -translate-y-[12px] transition"
                    style={{ opacity: isChecked ? '1' : '0' }}
                >
                    <CheckmarkIcon width="25px" height="24px" color="white" />
                </div>
            </label>
        </span>
    )
}

export default Checkbox
