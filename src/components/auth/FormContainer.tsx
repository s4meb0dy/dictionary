import React from 'react';

type FormContainerProps = {
    children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({children}) => {
    return (
        <div className='inline-block p-[40px] bg-secondaryBg rounded-[35px]'>
            {children}
        </div>
    );
};

export default FormContainer;