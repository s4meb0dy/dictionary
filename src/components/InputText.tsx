import React from "react"
import { InputSizeEnum } from "../types"

type TextInputProps = {
    size: InputSizeEnum
    styles?: string
    width?: string
    placeholder?: string
    defaultValue?: string
    onChangeValue: (value: string) => void
    error?: string
}

const sizeStyles = {
    large: "bg-[#FFFFFF] border-[1px] border-[#CDD5DE] h-[59px] px-[16px]",
}

const TextInput: React.FC<TextInputProps> = ({
    size,
    styles,
    width,
    defaultValue,
    placeholder,
    onChangeValue,
    error,
}) => {
    const [sizeStyle, setSizeStyle] = React.useState<string>("")

    const [value, setValue] = React.useState<string>(
        defaultValue ? defaultValue : ""
    )

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChangeValue(e.target.value)
    }

    React.useEffect(() => {
        switch (size) {
            case InputSizeEnum.Large:
                setSizeStyle(sizeStyles.large)
                break
        }
    }, [size, setSizeStyle])

    return (
        <input
            className={`${sizeStyle} rounded-[8px] text-[14px] text-inputText flex items-center placeholder:text-[14px] placeholder:text-inputPlaceholder active:shadow-null outline-[#0086EA] transition-colors ${
                styles ? styles : ""
            }`}
            style={width ? { width } : {}}
            placeholder={placeholder ? placeholder : ""}
            value={value}
            onChange={changeHandler}
        >
            {defaultValue && defaultValue}
        </input>
    )
}

export default TextInput
