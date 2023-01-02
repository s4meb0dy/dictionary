import React from 'react'
import FormContainer from '../components/auth/FormContainer'
import Button from '../components/Button'
import TextInput from '../components/InputText'
import { InputSizeEnum } from '../types'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

const RegisterPage = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: (values) => {
            console.log(values)
            // dispatch(login(values))
        },
    })

    return (
        <div className="min-h-full flex justify-center items-center p-[15px]">
            <FormContainer styles="flex flex-col items-center animate-appearance">
                <h2 className="font-medium text-[40px] tracking-tight pb-[25px]">
                    Create An Account
                </h2>
                <TextInput
                    size={InputSizeEnum.Large}
                    name="username"
                    id="username"
                    width="400px"
                    placeholder="Username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                    styles="mb-[15px]"
                />
               
                <TextInput
                    size={InputSizeEnum.Large}
                    name="email"
                    id="email"
                    width="400px"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    styles="mb-[15px]"
                />
                 <TextInput
                    size={InputSizeEnum.Large}
                    name="password"
                    id="password"
                    width="400px"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                    styles="mb-[15px]"
                    type="password"
                />
                <TextInput
                    size={InputSizeEnum.Large}
                    name="confirmPassword"
                    id="confirmPassword"
                    width="400px"
                    placeholder="Confirm password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    error={formik.errors.confirmPassword}
                    styles="mb-[30px]"
                    type="password"
                />
                <Button
                    styles="mb-[20px]"
                    name="Create account"
                    size={InputSizeEnum.Medium}
                    type='submit'
                />
                <p className="text-black/40">
                    {'Already Have An Account? '}
                    <Link className="underline" to="/login">
                        Login
                    </Link>
                </p>
            </FormContainer>
        </div>
    )
}

export default RegisterPage
