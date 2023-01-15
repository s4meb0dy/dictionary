import React from 'react'
import FormContainer from '../components/auth/FormContainer'
import Button from '../components/Button'
import TextInput from '../components/input/TextInput'
import { InputSizeEnum } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import WarningCircleIcon from '../components/icons/WarningCircleIcon'
import { registration } from '../redux/features/userSlice'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { openInfoBlock } from '../redux/features/appSlice'

type initialValuesType = {
    email: string
    username: string
    password: string
    confirmPassword: string
}

const validate: (values: initialValuesType) => object = (values) => {
    const errors: {
        password?: string
        email?: string
        username?: string
        confirmPassword?: string
    } = {}

    if (!values.username) {
        errors.username = 'Username field is required'
    }

    if (!values.email) {
        errors.email = 'Email field is required'
    }

    if (!values.password) {
        errors.password = 'Password field is required'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password field is required'
    }
    return errors
}

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: (
            values,
            { setFieldError }: FormikHelpers<initialValuesType>
        ) => {
            if (!values.email.includes('@')) {
                setFieldError('email', 'Email field must include @')
                return
            }

            dispatch(registration(values)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    dispatch(
                        openInfoBlock({
                            type: 'success',
                            title: 'Success',
                            text: 'You are registered',
                        })
                    )
                    navigate('/login')
                }
            })
            formik.resetForm()
        },
    })

    return (
        <div className="min-h-full flex justify-center items-center p-[15px]">
            <FormContainer styles="flex flex-col items-center animate-appearance">
                <h2 className="font-medium text-[40px] tracking-tight pb-[25px]">
                    Create An Account
                </h2>
                <form
                    className="flex flex-col items-center"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-[15px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="username"
                            width="400px"
                            placeholder="Username"
                            rightIcon
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.username &&
                                formik.errors.username
                                    ? formik.errors.username
                                    : undefined
                            }
                        />
                        {formik.touched.username && formik.errors.username && (
                            <label
                                htmlFor="username"
                                className="absolute top-[50%] -translate-y-[12px] right-[16px] cursor-pointer"
                            >
                                <WarningCircleIcon
                                    height="24"
                                    width="24"
                                    color="#FE2836"
                                />
                            </label>
                        )}
                    </div>
                    <div className="mb-[15px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="email"
                            width="400px"
                            placeholder="Email"
                            rightIcon
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email && formik.errors.email
                                    ? formik.errors.email
                                    : undefined
                            }
                        />
                        {formik.touched.email && formik.errors.email && (
                            <label
                                htmlFor="email"
                                className="absolute top-[50%] -translate-y-[12px] right-[16px] cursor-pointer"
                            >
                                <WarningCircleIcon
                                    height="24"
                                    width="24"
                                    color="#FE2836"
                                />
                            </label>
                        )}
                    </div>
                    <div className="mb-[15px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="password"
                            width="400px"
                            placeholder="Password"
                            rightIcon
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            type="password"
                            error={
                                formik.touched.password &&
                                formik.errors.password
                                    ? formik.errors.password
                                    : undefined
                            }
                        />
                        {formik.touched.password && formik.errors.password && (
                            <label
                                htmlFor="password"
                                className="absolute top-[50%] -translate-y-[12px] right-[16px] cursor-pointer"
                            >
                                <WarningCircleIcon
                                    height="24"
                                    width="24"
                                    color="#FE2836"
                                />
                            </label>
                        )}
                    </div>
                    <div className="mb-[15px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="confirmPassword"
                            width="400px"
                            placeholder="Confirm password"
                            rightIcon
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            type="password"
                            error={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                                    ? formik.errors.confirmPassword
                                    : undefined
                            }
                        />
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <label
                                    htmlFor="password"
                                    className="absolute top-[50%] -translate-y-[12px] right-[16px] cursor-pointer"
                                >
                                    <WarningCircleIcon
                                        height="24"
                                        width="24"
                                        color="#FE2836"
                                    />
                                </label>
                            )}
                    </div>
                    <Button
                        styles="mb-[20px]"
                        name="Create account"
                        size='medium'
                        type="submit"
                    />
                </form>
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
