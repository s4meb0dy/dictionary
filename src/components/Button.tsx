import React from 'react'
import { InputSizeEnum } from '../types'

type ButtonProps = {
    onClick?: () => void
    size: 'small' | 'medium' | 'large'
    name: string
    styles?: string
    width?: string
    disabled?: boolean
    color?: string
    hoverColor?: string
    activeColor?: string
    type?: 'submit' | 'reset' | 'button'
}

const sizeStyles = {
    large: '',
    medium: 'h-[40px] px-[16px]',
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    styles,
    size,
    name,
    width,
    disabled = false,
    color = '#0086EA',
    hoverColor,
    activeColor,
    type = 'button',
}) => {
    const [sizeStyle, setSizeStyle] = React.useState<string>('')

    const [isHover, setIsHover] = React.useState(false)
    const [isActive, setIsActive] = React.useState(false)


    const onEnterHoverHandler = () => {
        setIsHover(true)
    }

    const onLeaveHoverHandler = () => {
        setIsHover(false)
        setIsActive(false)
    }

    const toggleActive = () => {
        setIsActive((prev) => !prev)
    }

    React.useEffect(() => {
        switch (size) {
            case 'medium':
                setSizeStyle(sizeStyles.medium)
                break
        }
    }, [size, setSizeStyle])

    return (
        <button
            className={`${sizeStyle} bg-[${color}] active:bg-[${
                activeColor ? activeColor : color
            }] rounded-[8px] text-[14px] text-[#fff] leading-[40px] font-[600] transition-colors ${
                styles ? styles : ''
            }`}
            type={type}
            disabled={disabled}
            style={{
                width: width ? width : '',
                backgroundColor: isActive
                    ? activeColor
                        ? activeColor
                        : color
                    : isHover
                    ? hoverColor
                        ? hoverColor
                        : color
                    : color,
            }}
            onMouseEnter={onEnterHoverHandler}
            onMouseLeave={onLeaveHoverHandler}
            onMouseDown={toggleActive}
            onMouseUp={toggleActive}
            onClick={onClick && onClick}
        >
            {name}
        </button>
    )
}

export default Button
