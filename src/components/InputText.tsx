import React from 'react'
import { InputSizeEnum } from '../types'

type TextInputProps = {
    size: InputSizeEnum
    styles?: string
    width?: string
    placeholder?: string
    onBlur?: (e: React.FocusEvent<any, Element>) => void
    value: string
    onChange: (e: React.ChangeEvent<any>) => void
    error?: string
    type?: 'text' | 'password' | 'email'
    name: string
    id: string
}

const constStyles =
    'border-[1px] border-solid outline-none rounded-[8px] text-[14px] flex items-center placeholder:text-[14px] active:shadow-null  transition-colors'

const sizeStyles = {
    large: 'bg-[#FFFFFF] border-[1px] border-[#CDD5DE] h-[59px] pl-[16px] pr-[56px]',
}

const stateStyles = {
    default:
        'focus:border-[#0086EA] placeholder:text-inputPlaceholder text-inputText',
    error: 'border-error placeholder:text-error text-error',
    success: 'border-success',
}

const TextInput: React.FC<TextInputProps> = ({
    size,
    width,
    styles = '',
    type = 'text',
    name,
    id,
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
                setSizeStyle(sizeStyles.large)
                break
        }
    }, [size, setSizeStyle])

    React.useEffect(() => {
        if (error) setStateStyle(stateStyles.error)
        else setStateStyle(stateStyles.default)
        console.log(error)
    }, [error])

    return (
        <div className={`relative ${styles}`}>
            {error && (
                <label
                    htmlFor={id}
                    className="absolute top-[50%] -translate-y-[12px] right-[16px] h-[24px] w-[24px] bg-error cursor-pointer"
                />
            )}
            <input
                className={`${sizeStyle}  ${stateStyle} ${constStyles}`}
                style={width ? { width } : {}}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={name}
                id={id}
                formNoValidate
            />
        </div>
    )
}

export default TextInput
