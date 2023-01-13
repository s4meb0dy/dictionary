import React from 'react'
import FormContainer from '../components/auth/FormContainer'
import Button from '../components/Button'
import TextInput from '../components/InputText'
import { InputSizeEnum } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import WarningCircleIcon from '../components/icons/WarningCircleIcon'
import { login } from '../redux/features/userSlice'
import { openInfoBlock } from '../redux/features/appSlice'

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

    const navigate = useNavigate()

    const error = useAppSelector((state) => state.user.error)

    React.useEffect(() => {
        if (error)
            dispatch(
                openInfoBlock({ type: 'error', text: error, title: 'Error' })
            )
    }, [error])

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
            dispatch(login(values)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    dispatch(
                        openInfoBlock({
                            type: 'success',
                            title: 'Success',
                            text: 'You are logged in',
                        })
                    )
                    navigate('/')
                }
            })
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
                    <div className="mb-[15px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="email"
                            id="email"
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
                    <div className="mb-[30px] relative">
                        <TextInput
                            size={InputSizeEnum.Large}
                            name="password"
                            id="password"
                            width="400px"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            rightIcon
                            error={
                                formik.touched.password &&
                                formik.errors.password
                                    ? formik.errors.password
                                    : undefined
                            }
                            type="password"
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
        </div>
    )
}

export default LoginPage
