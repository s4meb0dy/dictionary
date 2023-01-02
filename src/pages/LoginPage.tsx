import React from 'react'
import FormContainer from '../components/auth/FormContainer'
import Button from '../components/Button'
import TextInput from '../components/InputText'
import { InputSizeEnum } from '../types'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { Formik, Field, Form, FormikHelpers } from 'formik'

import { login } from '../redux/features/userSlice'
import { useAppDispatch } from '../hooks/reduxHooks'

type initialValuesType = {
    password: string
    email: string
}

const validate: (values: initialValuesType) => object = (values) => {
    const errors: { password?: string; email?: string } = {}
    if (!values.email) {
        errors.email = 'Email field is required'
    }

    if (!values.password) {
        errors.password = 'Password field is required'
    }
    return errors
}

const LoginPage = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (
            values,
            { setFieldError }: FormikHelpers<initialValuesType>
        ) => {
            if (!values.email.includes('@'))
                setFieldError('email', 'Email field must include @')
            console.log(values)
            // dispatch(login(values))
        },
    })

    return (
        <div className="min-h-full flex justify-center items-center p-[15px]">
            <FormContainer styles="flex flex-col items-center ">
                <h2 className="font-medium text-[40px] tracking-tight pb-[25px]">
                    Login
                </h2>
                <form
                    className="flex flex-col items-center"
                    onSubmit={formik.handleSubmit}
                >
                    <TextInput
                        size={InputSizeEnum.Large}
                        name="email"
                        id="email"
                        width="400px"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : undefined
                        }
                        styles="mb-[15px]"
                        // type="email"
                    />
                    <TextInput
                        size={InputSizeEnum.Large}
                        name="password"
                        id="password"
                        width="400px"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={
                            formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : undefined
                        }
                        styles="mb-[30px]"
                        type="password"
                    />
                    <Button
                        styles="mb-[20px]"
                        name="Login"
                        type="submit"
                        size={InputSizeEnum.Medium}
                        // disabled={formik.errors && true}
                    />
                </form>
                <p className="text-black/40">
                    {'Have you had not an account yet? '}
                    <Link className="underline" to="/register">
                        Sign In
                    </Link>
                </p>
            </FormContainer>

            {/* <div className='bg-red-500 h-[1000px]'></div> */}
        </div>
    )
}

export default LoginPage
