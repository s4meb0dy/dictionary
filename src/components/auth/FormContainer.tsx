import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

type FormContainerProps = {
    children: React.ReactNode
    styles?: string
}

const FormContainer: React.FC<FormContainerProps> = ({ children, styles }) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )
    return (
        <div
            style={{ backgroundColor: secondaryColor }}
            className={`max-w-[400px] sm:max-w-[480px] w-full animate-appearance inline-block px-[23px] py-[30px] sm:p-[40px] rounded-[35px] shadow-primary ${
                styles ? styles : ''
            }`}
        >
            {children}
        </div>
    )
}

export default FormContainer
