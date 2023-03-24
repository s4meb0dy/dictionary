import React from 'react'

type ButtonProps = {
    onClick?: () => void
    size?: 'small' | 'medium' | 'large'
    styles?: string
    width?: string
    disabled?: boolean
    color?: string
    hoverColor?: string
    activeColor?: string
    type?: 'submit' | 'reset' | 'button'
    RightIcon?: JSX.Element
    LeftIcon?: JSX.Element
    children?: string
}

const sizeStyles = {
    small: 'h-[35px] px-[12px] text-[14px]',
    large: 'h-[56px] px-[24px] text-[16px]',
    medium: 'h-[40px] px-[16px] text-[14px]',
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    styles,
    size = 'medium',
    width,
    disabled = false,
    color = '#0086EA',
    hoverColor,
    activeColor,
    type = 'button',
    RightIcon,
    LeftIcon,
    children,
}) => {
    const [sizeStyle, setSizeStyle] = React.useState<string>(sizeStyles.medium)

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

    React.useLayoutEffect(() => {
        switch (size) {
            case 'small':
                setSizeStyle(sizeStyles.small)
                break
            case 'medium':
                setSizeStyle(sizeStyles.medium)
                break
            case 'large':
                setSizeStyle(sizeStyles.large)
                break
        }
    }, [size])

    return (
        <button
            className={`${sizeStyle} bg-[${color}] active:bg-[${
                activeColor ? activeColor : color
            }] rounded-[8px] text-[#fff] leading-[40px] font-[600] transition-all flex justify-center items-center select-none ${
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
            {LeftIcon && LeftIcon}
            <span className="px-[8px]">{children}</span>
            {RightIcon && RightIcon}
        </button>
    )
}

export default Button
