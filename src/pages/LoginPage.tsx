import React from "react"
import FormContainer from "../components/auth/FormContainer"
import Button from "../components/Button"
import TextInput from "../components/InputText"
import { InputSizeEnum } from "../types"

const LoginPage = () => {
    const onChangeUsername = (value: string) => {
        console.log(value)
    }
    const onChangePassword = (value: string) => {
        console.log(value)
    }

    return (
        <div className='h-full flex justify-center items-center'>
            <FormContainer styles='flex flex-col items-center'>
                <h2 className='font-medium text-[40px] tracking-tight pb-[25px]'>
                    Login
                </h2>
                <TextInput
                    size={InputSizeEnum.Large}
                    width='400px'
                    placeholder='Username'
                    onChangeValue={onChangeUsername}
                    styles='mb-[15px]'
                />
                <TextInput
                    size={InputSizeEnum.Large}
                    width='400px'
                    placeholder='Password'
                    onChangeValue={onChangePassword}
                    styles='mb-[30px]'
                />
                <Button name="Login" size={InputSizeEnum.Medium} />
            </FormContainer>
        </div>
    )
}

export default LoginPage
