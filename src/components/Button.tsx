import React from 'react'
import { InputSizeEnum } from '../types'

type ButtonProps = {
    size: InputSizeEnum
    name: string
    styles?: string
    disabled?: boolean
    type?: 'submit' | 'reset' | 'button'
}

const sizeStyles = {
    large: '',
    medium: 'h-[40px] px-[16px]',
}

const Button: React.FC<ButtonProps> = ({
    styles,
    size,
    name,
    disabled = false,
    type = 'button',
}) => {
    const [sizeStyle, setSizeStyle] = React.useState<string>('')

    React.useEffect(() => {
        switch (size) {
            case InputSizeEnum.Medium:
                setSizeStyle(sizeStyles.medium)
                break
        }
    }, [size, setSizeStyle])

    return (
        <button
            className={`${sizeStyle} bg-[#0086EA] hover:bg-[#53A0FF] active:bg-[#0D6CBD] rounded-[8px] text-[14px] text-[#fff] leading-[40px] font-[600] transition-colors ${
                styles ? styles : ''
            }`}
            type={type}
            disabled={disabled}
        >
            {name}
        </button>
    )
}

export default Button
