import React from "react"

type FormContainerProps = {
    children: React.ReactNode
    styles?: string
}

const FormContainer: React.FC<FormContainerProps> = ({ children, styles }) => {
    return (
        <div className={`inline-block p-[40px] bg-secondaryBg rounded-[35px] ${styles ? styles : ''}`}>
            {children}
        </div>
    )
}

export default FormContainer
