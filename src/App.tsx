import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useMatchMedia from 'use-match-media-hook'
import { setDeviceType } from './redux/features/appSlice'
import MainNavigation from './components/navigation/MainNavigation'
import InfoBlock from './components/modalWindows/InfoBlock'
import { userApi } from './redux/services/userApi'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

const queries = [
    '(max-width: 639px)',
    '(min-width: 640px) and (max-width: 1023px)',
    '(min-width: 1024px)',
]

function App() {
    const dispatch = useAppDispatch()

    userApi.useGetUserInfoQuery()

    const [isMobile, isTablet, isDesktop] = useMatchMedia(queries)

    React.useLayoutEffect(() => {
        dispatch(setDeviceType({ isMobile, isTablet, isDesktop }))
    }, [isMobile, isTablet, isDesktop])

    const backgroundColor = useAppSelector(
        (state) => state.app.colors.primaryColor
    )

    return (
        <>
            <div
                style={{ backgroundColor: backgroundColor }}
                className="font-main min-h-screen w-full relative z-10"
            >
                <Routes>
                    <Route path="/*" element={<MainNavigation />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
            <InfoBlock />

            {/* <AnimatedBg />  */}
        </>
    )
}

export default App
