import React from 'react'
import { InputSizeEnum } from '../../types'
import WarningCircle from '../icons/WarningCircleIcon'

type TextInputProps = {
    size: InputSizeEnum
    styles?: string
    width?: string
    placeholder?: string
    rightIcon?: boolean
    onBlur?: (e: React.FocusEvent<any, Element>) => void
    value: string
    onChange: (e: React.ChangeEvent<any>) => void
    error?: string
    type?: 'text' | 'password' | 'email'
    name: string
}

const constStyles =
    'border-[1px] border-solid outline-none rounded-[8px] text-[14px] flex items-center placeholder:text-[14px] active:shadow-null  transition-colors'

const sizeStyles = {
    large: 'bg-[#FFFFFF] border-[1px] border-[#CDD5DE] h-[59px] pl-[16px] pr-[16px]',
}

const stateStyles = {
    default:
        'focus:border-[#0086EA] placeholder:text-inputPlaceholder text-textDark',
    error: 'border-error placeholder:text-error text-error',
    success: 'border-success',
}

const TextInput: React.FC<TextInputProps> = ({
    rightIcon = false,
    size,
    width,
    styles = '',
    type = 'text',
    name,
    onBlur,
    placeholder = '',
    onChange,
    value,
    error,
}) => {
    const [sizeStyle, setSizeStyle] = React.useState<string>('')
    const [stateStyle, setStateStyle] = React.useState<string>(
        stateStyles.default
    )

    React.useEffect(() => {
        switch (size) {
            case InputSizeEnum.Large:
                setSizeStyle(
                    `bg-[#FFFFFF] border-[1px] border-[#CDD5DE] h-[59px] pl-[16px] ${
                        rightIcon ? 'pr-[56px]' : 'pr-[16px]'
                    }`
                )
                break
        }
    }, [size, rightIcon, setSizeStyle])

    React.useEffect(() => {
        if (error) setStateStyle(stateStyles.error)
        else setStateStyle(stateStyles.default)
        // console.log(error)
    }, [error])

    return (
        <input
            className={`${sizeStyle}  ${stateStyle} ${constStyles} ${styles}`}
            style={{ width }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            name={name}
            id={name}
            formNoValidate
        />
    )
}

export default TextInput
