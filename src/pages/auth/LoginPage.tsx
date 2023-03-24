import React from 'react'

import FormContainer from './../../components/auth/FormContainer'
import Button from './../../components/input/Button'
import TextInput from './../../components/input/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import WarningCircleIcon from './../../assets/icons/WarningCircleIcon'
import { userApi } from './../../redux/services/userApi'
import useErrorHandler from './../../hooks/useErrorHandler'
import { useAppDispatch, useAppSelector } from './../../hooks/reduxHooks'
import { openInfoBlock } from './../../redux/features/appSlice'

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
    const [login, { isSuccess, error }] = userApi.useLoginMutation()

    const dispatch = useAppDispatch()

    const deviceType = useAppSelector((state) => state.app.deviceType)

    React.useEffect(() => {
        if (isSuccess) {
            dispatch(
                openInfoBlock({
                    type: 'success',
                    title: 'Success',
                    text: 'You are logged in',
                })
            )
            navigate('/')
        }
    }, [isSuccess])

    const navigate = useNavigate()

    useErrorHandler(error as string)

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

            login({
                email: values.email,
                password: values.password,
            })
        },
    })

    return (
        <div className="min-h-full flex justify-center items-center p-[8px]">
            <FormContainer styles="flex flex-col items-center ">
                <h2 className="font-medium text-[32px] sm:text-[40px] tracking-tight pb-[25px]">
                    Login
                </h2>
                <form
                    className="flex flex-col items-center w-full"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="w-full mb-[15px] relative">
                        <TextInput
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                            name="email"
                            width="100%"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email && formik.errors.email
                                    ? formik.errors.email
                                    : undefined
                            }
                            RightIcon={
                                formik.touched.email && formik.errors.email ? (
                                    <WarningCircleIcon
                                        height="24"
                                        width="24"
                                        color="#FE2836"
                                    />
                                ) : undefined
                            }
                        />
                    </div>
                    <div className="w-full mb-[20px] sm:mb-[30px] relative">
                        <TextInput
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                            name="password"
                            width="100%"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={
                                formik.touched.password &&
                                formik.errors.password
                                    ? formik.errors.password
                                    : undefined
                            }
                            type="password"
                            RightIcon={
                                formik.touched.password &&
                                formik.errors.password ? (
                                    <WarningCircleIcon
                                        height="24"
                                        width="24"
                                        color="#FE2836"
                                    />
                                ) : undefined
                            }
                        />
                    </div>
                    <Button
                        styles=""
                        type="submit"
                        size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        color="#0086EA"
                        hoverColor="#53A0FF"
                        activeColor="#0D6CBD"
                        // disabled={formik.errors && true}
                    >
                        Login
                    </Button>
                </form>
                <p className="text-black/40 text-[12px] sm:text-[16px] mt-[15px] sm:mt-[20px]">
                    {'Have you had not an account yet? '}
                    <Link className="underline" to="/register">
                        Sign In
                    </Link>
                </p>
            </FormContainer>
        </div>
    )
}

export default LoginPage
