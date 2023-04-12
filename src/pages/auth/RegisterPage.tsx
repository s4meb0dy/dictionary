import React from 'react'
import FormContainer from '../../components/auth/FormContainer'
import Button from '../../components/input/Button'
import TextInput from '../../components/input/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import WarningCircleIcon from '../../assets/icons/WarningCircleIcon'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { openInfoBlock } from '../../redux/features/appSlice'
import { userApi } from '../../redux/services'
import useErrorHandler from '../../hooks/useErrorHandler'
import { getMyDictionariesUrl } from '../../utils/navigateUrl'

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
    const navigate = useNavigate()

    const [registration, { isSuccess, error }] =
        userApi.useRegistrationMutation()

    const dispatch = useAppDispatch()

    const deviceType = useAppSelector((state) => state.app.deviceType)

    React.useEffect(() => {
        if (isSuccess) {
            dispatch(
                openInfoBlock({
                    type: 'success',
                    title: 'Success',
                    text: 'The account is registered ',
                })
            )
            navigate(getMyDictionariesUrl())
        }
    }, [isSuccess])

    React.useEffect(() => {
        isSuccess && navigate('/')
    }, [isSuccess])

    useErrorHandler(error as string)

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

            registration(values).catch(() => {
                formik.resetForm()
            })
        },
    })

    return (
        <div className="min-h-screen flex justify-center items-center p-[15px]">
            <FormContainer styles="flex flex-col items-center animate-appearance">
                <h2 className="text-center font-medium text-[32px] sm:text-[40px] tracking-tight pb-[25px]">
                    Create An Account
                </h2>
                <form
                    className="w-full flex flex-col items-center"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="w-full mb-[15px] relative">
                        <TextInput
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                            name="username"
                            width="100%"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.username &&
                                formik.errors.username
                                    ? formik.errors.username
                                    : undefined
                            }
                            RightIcon={
                                formik.touched.username &&
                                formik.errors.username ? (
                                    <WarningCircleIcon
                                        height="24"
                                        width="24"
                                        color="#FE2836"
                                    />
                                ) : undefined
                            }
                        />
                    </div>
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
                    <div className="w-full mb-[15px] relative">
                        <TextInput
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                            name="password"
                            width="100%"
                            placeholder="Password"
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
                    <div className="w-full mb-[20px] sm:mb-[30px] relative">
                        <TextInput
                            size={deviceType === 'Mobile' ? 'medium' : 'large'}
                            name="confirmPassword"
                            width="100%"
                            placeholder="Confirm password"
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
                            RightIcon={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword ? (
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
                        size={deviceType === 'Mobile' ? 'small' : 'medium'}
                        type="submit"
                    >
                        Create account
                    </Button>
                </form>
                <p className="text-black/40 text-[12px] sm:text-[16px]  mt-[15px] sm:mt-[20px]">
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
