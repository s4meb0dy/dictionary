import React from 'react'

type TextInputProps = {
    size: 'small' | 'medium' | 'large'
    styles?: string
    width?: string
    placeholder?: string
    RightIcon?: JSX.Element
    LeftIcon?: JSX.Element
    onClickRightIcon?: (e: React.ChangeEvent<any>) => void
    onClickLeftIcon?: (e: React.ChangeEvent<any>) => void
    onBlur?: (e: React.FocusEvent<any, Element>) => void
    value: string
    onChange: (e: React.ChangeEvent<any>) => void
    error?: string
    type?: 'text' | 'password' | 'email'
    name: string
}

const constStyles =
    'border-[1px] border-solid outline-none rounded-[8px] text-[14px] flex items-center placeholder:text-[14px] active:shadow-null transition-colors w-full'

const stateStyles = {
    default:
        'focus:border-[#0086EA] placeholder:text-inputPlaceholder text-textDark',
    error: 'border-error placeholder:text-error text-error',
    success: 'border-success',
}

const TextInput: React.FC<TextInputProps> = ({
    RightIcon,
    LeftIcon,
    onClickRightIcon,
    onClickLeftIcon,
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
            case 'large':
                setSizeStyle(
                    `bg-[#FFFFFF] border-[1px] border-[#CDD5DE] h-[59px] pl-[16px] transition-colors ${
                        RightIcon ? 'pr-[56px]' : 'pr-[16px]'
                    } ${LeftIcon ? 'pl-[56px]' : 'pla-[16px]'}`
                )
                break
        }
    }, [size, RightIcon, LeftIcon, setSizeStyle])

    React.useEffect(() => {
        if (error) setStateStyle(stateStyles.error)
        else setStateStyle(stateStyles.default)
    }, [error])

    return (
        <div className="relative" style={{ width }}>
            {LeftIcon && (
                <label
                    htmlFor={name}
                    className={`absolute top-[50%] left-[16px] cursor-pointer transition-all`}
                    onClick={onClickLeftIcon && onClickLeftIcon}
                    style={{
                        transform: `translate(0px, -${
                            LeftIcon.props?.width / 2
                        }px)`,
                    }}
                >
                    {LeftIcon}
                </label>
            )}
            <input
                className={`${sizeStyle} ${stateStyle} ${constStyles} ${styles}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={name}
                id={name}
                formNoValidate
                style={{ borderColor: error ? '#FE2836' : '' }}
            />
            {RightIcon && (
                <label
                    htmlFor={name}
                    className={`absolute top-[50%] right-[16px] cursor-pointer transition-all`}
                    onClick={onClickRightIcon && onClickRightIcon}
                    style={{
                        transform: `translate(0px, -${
                            RightIcon.props?.width / 2
                        }px)`,
                    }}
                >
                    {RightIcon}
                </label>
            )}
        </div>
    )
}

export default TextInput
